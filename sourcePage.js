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
const { OUT_FOLDER } = require('./utils.js');

class _SourcePage {
  constructor(sourcePath) {
    if (!fs.existsSync(`${sourcePath}`)) {
      let msg = `Cannot find ${sourcePath}.`
      throw new ReferenceError(msg);
    }
    this._sourcePath = sourcePath;
    this._source = fs.readFileSync(sourcePath).toString();
    this._lines = this._source.split('\n');
    this._sections = this._source.split("## ");
    this._memberLink;
    this._bcdKey;
  }

  get memberLink() {
    if (this._memberLink) { return this._memberLink; }
    this._processMetaData();
    return this._memberLink;
  }

  get bcdKey() {
    if (this._bcdKey) { return this._bcdKey; }
    this._processMetaData();
    return this._bcdKey;
  }

  _processMetaData() {
    const first = this._lines.indexOf("---") + 1;
    const last = this._lines.lastIndexOf("---") - 1;
    for (let i = first; i <= last; i++) {
      if (this._lines[i].startsWith('specifications')) {
        let piece = this._lines[i].split("#")[1].trim();
        this._memberLink = `#${piece}`;
      } else if (this._lines[i].startsWith('browser_compatibility')) {
        this._bcdKey = this._lines[1].split(":")[1].trim();
      }
    }
  }

  get interfaceText() {
    let pieces = this._source.split("---");
    return pieces.pop();
  }

  get constructorText() {
    const section = this._getSection('Constructor');
    if (!section) { return; }
    return section.split('\n');
  }

  get description() {
    return this._getSection('Description');
  }

  get events() {
    return this._getSubSections('Events');
  }

  get examples() {
    return this._getSection('Examples');
  }

  get methods() {
    return this._getSubSections('Methods');
  }

  get properties() {
    return this._getSubSections('Properties');
  }

  _getSubSections(sectionName) {
    const section = this._getSection(sectionName);
    let parts = section.split('**`');
    parts.shift();
    return parts;
  }

  _getSection(sectionName) {
    let rawSection = this._sections.find(s => {
      return s.startsWith(sectionName);
    });
    let result = rawSection.split(sectionName)[1].trim();
    if (result == 'None.') { return null; }
    return result;
  }

}

module.exports.SourcePage = _SourcePage;