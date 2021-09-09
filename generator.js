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

const { MDNPage } = require('./mdnPage.js');
const { Finder } = require('@jpmedley/mdn-helper/finder.js');
const { SourcePage } = require('./sourcePage.js');
const { HEADER_MACROS } = require('./utils.js');

const IN = `content/en-US/api/`;

class _Generator {
  constructor(source) {
    this._sourcePage = new SourcePage(`${IN}${source}`);
    const finder = new Finder(['Finder', this._sourcePage.title, '-f', '-o']);
    this._IDL = finder.findAndReturn();
    this._mdnPages = [];
    this._interfaceName = source.split('.md')[0];
  }

  generate() {
    this._makeInterface();
    this._makeConstructor();
    this._makeEvents();
    this._makeMethods();
    this._makeProperties();
    this._replaceVariable('[[shared:interface]]', this._interfaceName);
    this._writeContent();
  }

  _replaceVariable(variable, value) {
    for (let m of this._mdnPages) {
      m.replaceString(variable, value);
    }
  }

  _writeContent() {
    for (let m of this._mdnPages) {
      m.write();
    }
    const writePath = this._mdnPages[0].mdnDirPath;
    const msg = `\nNew files written to:\n\t${writePath}`;
    console.log(msg);
  }

  _makeInterface() {
    let interfaceText = this._sourcePage.interfaceText;
    interfaceText = this.stripReaderComments(interfaceText);
    interfaceText = interfaceText.replace('---<', `---\n${HEADER_MACROS}\n\n<`);
    const interfacePage = new MDNPage(this._interfaceName, 'interface');
    interfacePage.replaceContent(interfaceText);
    this._mdnPages.push(interfacePage);
  }

  _makeConstructor() {
    let constructorText = this._sourcePage.constructorText;
    if (!constructorText) { return; }
    constructorText = `<p class="summary">${constructorText}</p>`
    const constructorPage = new MDNPage(this._interfaceName, 'constructor');
    constructorPage.inject(constructorText, "[[Description]]");
    const newLink = `#dom-${this._interfaceName.toLowerCase()}-constructor`;
    constructorPage.replaceString(`[[memberLink]]`, newLink);
    this._mdnPages.push(constructorPage);
  }

  _makeEvents() {
    let eventText = this._sourcePage.events;
    if (!eventText) { return; }
    let newMDNPage;
    const memberList = this._splitList(eventText);
    for (let m of memberList) {
      newMDNPage = new MDNPage(m[0], 'eventhandler');
      let callbackName = m[0].split('.')[1];
      let eventName = callbackName.substring(2);
      newMDNPage.inject(eventName, { location: "[[eventName]]" });
      newMDNPage.inject(callbackName, { location: "[[EventHandler]]" });
      newMDNPage.inject(m[1], { location: "[[eventOccurs]]", lcStart: true });
      this._mdnPages.push(newMDNPage);
    }
  }

  _makeMethods() {
    let methodText = this._sourcePage.methods;
    if (!methodText) { return; }
    const newPages = this._renderList(methodText, 'method');
    this._mdnPages.push(...newPages);
  }

  _makeProperties() {
    let propertyText = this._sourcePage.properties;
    if (!propertyText) { return; }
    let newMDNPage;
    const memberList = this._splitList(propertyText);
    for (let m of memberList) {
      newMDNPage = new MDNPage(m[0], 'property');
      const names = m[0].split('.');
      let propertyName = names[1];
      newMDNPage.inject(propertyName, { location: "[[property]]" });
      let description = m[1];
      if (description.includes("{{readonlyInline}}")) {
        newMDNPage.inject(" read-only", { location: "[[readOnly]]"});
        description = description.split("{{readonlyInline}}")[1].trim();
      } else {
        newMDNPage.inject("", { location: "[[readOnly]]" });
        description = description.trim();
      }
      newMDNPage.inject(description, { location: "[[description]]", lcStart: true });
      this._mdnPages.push(newMDNPage);
    }
  }

  _renderList(listText, type) {
    let newMDNPage;
    let newMDNPages = [];
    const memberList = this._splitList(listText);
    for (let m of memberList) {
      newMDNPage = new MDNPage(m[0], type.toLowerCase());
      newMDNPage.inject(m[1], "[[description]]");
      newMDNPage.replaceString(`[[${type}]]`, newMDNPage.shortName);
      const newLink = `#dom-${this._interfaceName.toLowerCase()}-${newMDNPage.shortName.toLowerCase()}`
      newMDNPage.replaceString(`[[memberLink]]`, newLink);
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

  stripReaderComments(content) {
    const SHIPPING_NOTICE = /\*\*When this feature ships[^*]*\*\*/;
    return content.replace(SHIPPING_NOTICE, '');
  }

}

module.exports.Generator = _Generator;