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
const HelperUtils = require('@jpmedley/mdn-helper/utils.js');

class _MDNPage {
  constructor(name, type) {
    this._name = name;
    this._shortName;
    this._type = type;
    this._content = HelperUtils.getTemplate(`${type}.md`);
    this.replaceString(`[[shared:experimental]]`, '');
  }

  get mdnContentPath() {
    return `${this.mdnDirPath}index.md`;
  }

  get mdnDirPath() {
    let temp = this.name;
    if (this._type === 'constructor') { temp = `${temp}/${temp}`; }
    temp = temp.replace('.', '/');
    temp = temp.replace('()', '');
    temp = temp.toLowerCase();
    let out = HelperUtils.resolveHome('$HOME/Desktop/out/');
    temp = `${out}${temp}`;
    return `${temp}/`;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get shortName() {
    if (this._shortName) { return this._shortName; }
    if (!this._name.includes('.')) {
      this._shortName = this._name;
      return this._shortName;
    }
    this._shortName = this._name.split('.')[1];
    this._shortName = this._shortName.split('(')[0];
    return this._shortName;
  }

  append(content) {
    this._content += content;
  }

  inject(content, options = { location, lcStart }) {
    content = this._stripBullet(content);
    if (options.lcStart) {
      content = this._lowercaseStart(content);
    }
    this.replaceString(options.location, content);
  }

  _stripBullet(text) {
    if (text.startsWith("- : ")) {
      text = text.split("- : ")[1].trim();
    }
    return text;
  }

  _lowercaseStart(text) {
    const firstChar = text.substring(0,1);
    const newFirstChar = firstChar.toLowerCase();
    text = text.replace(firstChar, newFirstChar);
    return text;
  }

  linkifyMemberNames() {
    const MEMBERNAME_RE = /\*\*`(\w*\.\w*)\(?\)?`\*\*/;
    let aMemberName = this._content.match(MEMBERNAME_RE);
    while (aMemberName) {
      const link = `{{domxref("${aMemberName[1]}")}}`;
      this._content = this._content.replace(MEMBERNAME_RE, link);
      aMemberName = this._content.match(MEMBERNAME_RE);
    }
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

  }

  write() {
    fs.mkdirSync(this.mdnDirPath, { recursive: true });
    this.linkifyMemberNames();
    this._cleanup();
    fs.writeFileSync(this.mdnContentPath, this._content);
  }
}

module.exports.MDNPage = _MDNPage;