'use strict';

const fs = require('fs');
const HOMEDIR = require('os').homedir();
const MarkdownIt = require('markdown-it');

const OUT_FOLDER = `${HOMEDIR}/Desktop/out`;
const INPUT = process.argv[2];
let OUTPUT;


let COMPAT_TABLE = `<h2 id="Browser_compatibility">Browser compatibility</h2>

<div class="hidden">The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out <a href="https://github.com/mdn/browser-compat-data">https://github.com/mdn/browser-compat-data</a> and send us a pull request.</div>

<p>{{Compat("[[Key]]")}}</p>`

let SPEC_TABLE = `<h2 id="Specifications">Specifications</h2>

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

newLines.push('{{draft}}{{securecontext_header}}{{APIRef("")}}');
for (let l of markdownLines) {
  if (l.startsWith("**`")) {
    let name = l.slice(0, -3).slice(3);
    l = `<p>{{domxref("${name}")}}</p>`;
  } else if (l.startsWith('## Con')) {
    l = `<h2>Constructor</h2>\n<p>{{domxref("${apiName}.${apiName}()")}}`
  } else if (l.startsWith('```') && (example===false)) {
    example = true;
    l = '<pre class="brush: js">';
  } else if (l.startsWith('```') && (example===true)) {
    example = false;
    l = '</pre>';
  } else if (example===true) {
    // Do nothing.
  } else if (l.startsWith('---')) {
    // Do nothing.
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
