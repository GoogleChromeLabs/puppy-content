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

module.exports.COMPAT_TABLE = `<h2 id="Browser_compatibility">Browser compatibility</h2>

<div class="hidden">The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out <a href="https://github.com/mdn/browser-compat-data">https://github.com/mdn/browser-compat-data</a> and send us a pull request.</div>

<p>{{Compat("[[Key]]")}}</p>`

module.exports.HEADER_MACROS = '{{securecontext_header}}{{APIRef("")}}';

module.exports.SPEC_TABLE = `<h2 id="Specifications">Specifications</h2>

<table class="standard-table">
 <tbody>
  <tr>
   <th scope="col">Specification</th>
   <th scope="col">Status</th>
   <th scope="col">Comment</th>
  </tr>
  <tr>
   <td>{{SpecName('[[SpecName]]','#[[Link]]','[[Member]]')}}</td>
   <td>{{Spec2('[[SpecName]]')}}</td>
   <td>Initial definition.</td>
  </tr>
 </tbody>
</table>`

const _HOMEDIR = require('os').homedir();
module.exports.HOMEDIR = _HOMEDIR
module.exports.OUT_FOLDER = `${_HOMEDIR}/Desktop/out`;