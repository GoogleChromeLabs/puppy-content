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
const MarkdownIt = require('markdown-it');

const _COMPAT_TABLE = `<h2 id="Browser_compatibility">Browser compatibility</h2>

<div class="hidden">The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out <a href="https://github.com/mdn/browser-compat-data">https://github.com/mdn/browser-compat-data</a> and send us a pull request.</div>

<p>{{Compat("api.[[shared:interface]]")}}</p>`

const _HEADER_MACROS = '<div>{{securecontext_header}}{{APIRef("")}}</div>';

const _SPEC_TABLE = `<h2 id="Specifications">Specifications</h2>

<table class="standard-table">
 <tbody>
  <tr>
   <th scope="col">Specification</th>
   <th scope="col">Status</th>
   <th scope="col">Comment</th>
  </tr>
  <tr>
   <td>{{SpecName('[[shared:mdnSpecName]]','[[memberLink]]','[[shared:interface]]')}}</td>
   <td>{{Spec2('[[shared:mdnSpecName]]')}}</td>
   <td>Initial definition.</td>
  </tr>
 </tbody>
</table>`

const _HOMEDIR = require('os').homedir();
const _OUT_FOLDER = `${_HOMEDIR}/Desktop/out`;

function _listify(section) {
  let lines = section.split('`**');
  let mi = new MarkdownIt();
  for (let l of lines) {
    if (l.endsWith('`**')) {
      l = l.split('`**')[0];
      l = `<dt>{{domxref('${l}')}}</dt>`
    } else {
      l = `<dd>${l}</dd>`;
      l = mi.render(l);
    }
  }
  let list = lines.join('\n');
  list = `<dl>${list}</dl>`;
  return list;
}

function _makeOutputFolder(dirName) {
  _makeFolder(_OUT_FOLDER);
  const folderToMake = _resolveHome(`${OUT}${dirName}/`);
  return _makeFolder(folderToMake);
}

function _makeFolder(dirName) {
  dirName = _resolveHome(dirName);
  if (fs.existsSync(dirName)) { return dirName; }
  fs.mkdirSync(dirName);
  return dirName;
}


module.exports.COMPAT_TABLE = _COMPAT_TABLE;
module.exports.HEADER_MACROS = _HEADER_MACROS;
module.exports.HOMEDIR = _HOMEDIR;
module.exports.OUT_FOLDER = _OUT_FOLDER;
module.exports.SPEC_TABLE = _SPEC_TABLE;
module.exports.listify = _listify;
module.exports.makeFolder = _makeFolder;
module.exports.makeOutputFolder = _makeOutputFolder;