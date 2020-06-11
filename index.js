const path = require("path");
const through = require("through2-concurrent");
const Optidash = require("optidash");
const pretty = require("pretty-bytes");
const chalk = require("chalk");
const flog = require("fancy-log");
const plural = require("plur");
const PluginError = require("plugin-error");

module.exports = (options = {}) => {
    const defaults = {
        compression: "medium",
        concurrency: 6
    };

    options = Object.assign({}, defaults, options);

    if (!options.key) {
        throw new PluginError("gulp-optidash", "Please provide a valid Optidash API Key.");
    }

    let stats = {
        count: 0,
        input: 0,
        output: 0,
    };

    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"];

    if (options.concurrency < 1) {
        options.concurrency = 1;
    }

    return through.obj({
        maxConcurrency: options.concurrency
    }, (file, enc, cb) => {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new PluginError("gulp-optidash", "Streams are not supported"));
        }

        const isValidFile = validExtensions.includes(path.extname(file.path).toLowerCase());

        if (!isValidFile) {
            flog("gulp-optidash", `Skipping unsupported file ${chalk.blue(file.relative)}`);
            return cb(null, file);
        }

        const opti = new Optidash(options.key);

        opti.upload(file.path).optimize({
            compression: options.compression
        }).toBuffer((err, meta, data) => {
            if (err) {
                return cb(new PluginError("gulp-optidash", err, {
                    fileName: file.path
                }));
            }

            stats.input += meta.input.bytes;
            stats.output += meta.output.bytes;
            stats.count++;

            file.contents = data;

            const saved = meta.input.bytes - meta.output.bytes;
            const percent = ((saved / meta.input.bytes) * 100).toFixed(2);
            const message = saved > 0 ? `saved ${pretty(saved)} (${percent}%)` : "already optimized";

            flog("gulp-optidash", chalk.green("✔ ") + file.relative + chalk.gray(` | ${message}`));

            cb(null, file);
        });
    }, (cb) => {
        const saved = stats.input - stats.output;
        const percent = stats.input > 0 ? ((saved / stats.input) * 100).toFixed(2) : 0;

        let message = `Optimized ${stats.count} ${plural("image", stats.count)}`;

        if (stats.count > 0) {
            message += chalk.gray(` | saved ${pretty(saved)} (${percent}%)`);
        }

        flog("gulp-optidash", message);

        cb();
    });
};