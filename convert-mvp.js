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
const { COMPAT_TABLE,
        HEADER_MACROS,
        OUT_FOLDER,
        SPEC_TABLE
} = require('./utils.js');

const INPUT = process.argv[2];
let OUTPUT;

if (process.argv[3]) {
  OUTPUT = `${OUT_FOLDER}/${process.argv[3]}`;
} else {
  const pieces = INPUT.split("/");
  let name = pieces[pieces.length -1];
  name = name.slice(0, -3);
  if (!fs.existsSync(`${OUT_FOLDER}/${name}`)) {
    fs.mkdirSync(`${OUT_FOLDER}/${name}`);
  }
  OUTPUT = `${OUT_FOLDER}/${name}/${name}.html`;
}

const buffer = fs.readFileSync(INPUT);
const markdownDraft = buffer.toString();
const markdownLines = markdownDraft.split('\n');
let newLines = [];
let endMatter = [];
const md = new MarkdownIt();
let example = false;
let pieces;
let apiName = '';

newLines.push(HEADER_MACROS);
for (let l of markdownLines) {
  if (l.startsWith("**`")) {
    let name = l.slice(0, -3).slice(3);
    l = `<p>{{domxref("${name}")}}</p>`;
  } else if (l.startsWith('## Con')) {
    l = `<h2>Constructor</h2>\n<p>{{domxref("${apiName}.${apiName}()")}}`
  } else if (l.startsWith('```') && (example===false)) {
    example = true;
    l = '<pre class="brush: js">';
  } else if (l.startsWith('<style>') && example) {
    l = l.replace('<style', '&lt;style');
  } else if (l.startsWith('<div') && example) {
    l = l.replace('<div', '&lt;div');
  } else if (l.startsWith('<section') && example) {
    l = l.replace('<section', '&lt;section');
  } else if (l.startsWith('```') && example) {
    example = false;
    l = '</pre>';
  } else if (example===true) {
    // Do nothing.
  } else if (l.startsWith('---')) {
    // Do nothing.
  } else if (l.startsWith('<div>')) {
    // Do nothing.
  } else if (l.startsWith('<p class="hidden">')) {
    // Do nothing.
  } else if (l.startsWith('//')) {
    l = '';
  } else if (l.startsWith('title:')) {
    pieces = l.split(":")
    if (pieces[1]) {
      apiName = pieces[1].trim();
      if (apiName.startsWith("'")) { apiName = apiName.slice(1, -1); }
      if (apiName.startsWith('[[')) { apiName = apiName.slice(2, -2); }
      apiName = apiName.trim();
    }
  } else if (l.startsWith('specifications:')) {
    pieces = l.split("#");
    if (pieces[1]) {
      let spec = SPEC_TABLE.replace('[[Link]]', pieces[1].trim());
      spec = spec.replace('[[Member]]', apiName);
      endMatter.push(spec);
    } else {
      endMatter.push(SPEC_TABLE);
    }
  } else if (l.startsWith('browser_compatibility:')) {
    pieces = l.split(":");
    if (pieces[1]) {
      let compat = COMPAT_TABLE.replace('[[Key]]', `api.${apiName}`);
      endMatter.push(compat);
    } else {
      endMatter.push(COMPAT_TABLE);
    }
  } else {
    l = md.render(l);
  }

  newLines.push(l);
}

newLines.push(...endMatter);
let htmlDoc = newLines.join('\n');

console.log(`\nWriting HTML to ${OUTPUT}.\n`)
fs.writeFileSync(OUTPUT, htmlDoc);
