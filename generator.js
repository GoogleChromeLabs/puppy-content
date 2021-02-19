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

const { HTMLPage } = require('./mdnPage.js');
const { SourcePage } = require('./sourcePage.js');
const { SPEC_TABLE, COMPAT_TABLE } = require('./utils.js');
const { OUT } = require('mdn-helper/utils.js');

const IN = `content/en-US/api/`;

const mi = MarkdownIt({ html: true, linkify: true });

class _Generator {
  constructor(source) {
    this._sourcePage = new SourcePage(`${IN}${source}`);
    this._mdnPages = [];
    this._interfaceName = source.split('.md')[0];
  }

  generate(atRoot) {
    this._makeInterface();
    this._makeConstructor();
    this._makeEvents();
    this._makeMethods();
    this._replaceVariable('[[shared:interface]]', this._interfaceName);
    this._writeContent();
  }

  _replaceVariable(variable, value) {
    for (let m of this._mdnPages) {
      m.replaceVariable(variable, value);
    }
  }

  _writeContent() {
    for (let m of this._mdnPages) {
      m.write();
    }
  }

  _makeInterface() {
    let interfaceText = this._sourcePage.interfaceText;
    interfaceText = mi.render(interfaceText);
    const interfacePage = new HTMLPage(this._interfaceName, 'interface');
    interfacePage.replaceContent(interfaceText);
    interfacePage.stripReaderComments();
    this._mdnPages.push(interfacePage);
  }

  _makeConstructor() {
    let constructorText = this._sourcePage.constructorText;
    if (!constructorText) { return; }
    constructorText = `<p class="summary">${constructorText}</p>`
    constructorText = mi.render(constructorText);
    const constructorPage = new HTMLPage(this._interfaceName, 'constructor');
    constructorPage.inject(constructorText, 'Summary');
    this._mdnPages.push(constructorPage);
  }

  _makeEvents() {
    let eventText = this._sourcePage.events;
    if (!eventText) { return; }
    const newPages = this._renderList(eventText);
    this._mdnPages.push(...newPages);
  }

  _makeMethods() {
    let methodText = this._sourcePage.methods;
    if (!methodText) { return; }
    const newPages = this._renderList(methodText);
    this._mdnPages.push(...newPages);
  }

  _renderList(listText) {
    let newMDNPage;
    let newMDNPages = [];
    const memberList = this._splitList(listText);
    for (let m of memberList) {
      newMDNPage = new HTMLPage(m[0], 'eventhandler');
      m[1] = mi.render(m[1]);
      newMDNPage.inject(m[1], 'Summary');
      // this._mdnPages.push(newMDNPage);
      newMDNPages.push(newMDNPage);
    }
    return newMDNPages;
  }

  _splitList(sourceText) {
    let newList = [];
    for (let s in sourceText) {
      if (sourceText[s].includes('`**')) {
        let sourceLines = sourceText[s].split('`**');
        sourceLines[1] = sourceLines[1].replace('\n', '').trim();
        newList.push(sourceLines);
      }
    }
    return newList;
  }
}

module.exports.Generator = _Generator;