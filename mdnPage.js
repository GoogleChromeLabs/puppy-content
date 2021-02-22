// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const fs = require('fs');
const HelperUtils = require('mdn-helper/utils.js');

const LOCATIONS = ["Summary"];

const SUMMARY_RE = /<p class="summary">.*$/gm

const LOCATION_REGEXS = {
  "Summary": SUMMARY_RE
}


class _HTMLPage {
  constructor(name, type) {
    this._name = name;
    this._type = type;
    this._content = HelperUtils.getTemplate(`${type}.html`);
    this.replaceString(`[[shared:experimental]]`, '');
  }

  get mdnContentPath() {
    return `${this.mdnDirPath}index.html`;
  }

  get mdnDirPath() {
    let temp = this.name;
    temp = temp.replace('.', '/');
    temp = temp.replace('()', '');
    temp = temp.toLowerCase();
    let out = HelperUtils.resolveHome('$HOME/Desktop/out/');
    temp = `${out}${temp}`;
    console.log(temp);
    return `${temp}/`;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  append(content) {
    this._content += content;
  }

  inject(content, options = { location }) {
    if (options.location) {
      if (!LOCATIONS.includes(options.location)) {
        const msg = 'The value of options.location is not valid.';
        throw new TypeError(msg);
      }
    }
    this._content.replace(LOCATION_REGEXS[options.location], content);
  }

  replaceString(variable, value) {
    while (this._content.includes(variable)) {
      this._content = this._content.replace(variable, value);
    }
  }

  replaceContent(content) {
    let pieces = this._content.split("---");
    pieces[pieces.length - 1] = content;
    this._content = pieces.join("---");
  }

  _cleanup() {
    this.replaceString('pre><code class="language-js"', 'pre class="brush: js notranslate"');
    this.replaceString('</code></pre>', '</pre>');
  }

  write() {
    fs.mkdirSync(this.mdnDirPath, { recursive: true });
    this._cleanup();
    fs.writeFileSync(this.mdnContentPath, this._content);
  }
}

module.exports.HTMLPage = _HTMLPage;