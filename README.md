<p align="center"><a href="https://optidash.ai"><img src="media/logotype.png" alt="Optidash" width="143" height="45"/></a></p>

<p align="center">
Optidash is a modern, AI-powered image optimization and processing API.<br>We will drastically speed-up your websites and save you money on bandwidth and storage.
</p>

---
<p align="center">
<strong>The official Gulp plugin for image optimization with Optidash API.</strong><br>
<br>
<img src="https://img.shields.io/npm/v/gulp-optidash?style=flat&color=success"/>
<img src="https://img.shields.io/node/v/gulp-optidash?style=flat&color=success"/>
<img src="https://img.shields.io/snyk/vulnerabilities/npm/gulp-optidash@1.0.0?style=flat&color=success"/>
<img src="https://img.shields.io/github/issues-raw/optidash-ai/optidash-gulp?style=flat&color=success"/>
<img src="https://img.shields.io/npm/l/optidash?style=flat&color=success"/>
<img src="https://img.shields.io/twitter/follow/optidashAI?label=Follow%20Us&style=flat&color=success&logo=twitter"/>
</p>

---

### Installation
```bash
$ npm install gulp-optidash --save-dev
```

### Quick example

```js
const gulp = require("gulp"),
const opti = require("gulp-optidash");

exports.default = () => (
    gulp.src("src/images/*")
        .pipe(opti())
        .pipe(gulp.dest("dist/images"))
);
```

### Options

```js
{
    key: "optidash-api-key"
    compression: "medium",
    concurrency: 6
}
```

#### key

Your Optidash API Key. If you don't have your API Key just yet, you can [sign-up for a free account](https://app.optidash.ai/signup) which comes with a monthly quota of 500 API calls.

* type: `string`
* default: `""`

#### compression

Controls compression and optimization mode as described in the [Optidash API Docs](https://docs.optidash.ai/optimization/overview#lossy-optimization-presets).

* type: `string`
* values: `lossless` | `low` | `medium` | `high`
* default: `medium`

#### concurrency

Controls the maxium number of input images that may be performed in parallel.

* type: `number`
* values: `1 - 16`
* default: `6`

### License
This software is distributed under the MIT License. See the [LICENSE](LICENSE) file for more information.