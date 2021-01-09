// Copyright 2020 Google LLC
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
const git = require('git-promise');

const { Command } = require('commander');
const { Confirm, Select } = require('enquirer');
const { platform } = require('os');
const { createPrivateKey } = require('crypto');

const CANCEL = "(Cancel)";

const CREATION_PATH='content/en-US';
const API_PATH = `${CREATION_PATH}/api`;
const CSS_PATH = `${CREATION_PATH}/css`;
const TEMPLATE_PATH = "templates";
const TEMPLATES = {
  "CSS": "css-property.md",
  "Interface": "interface.md",
  "Constructor": "constructor.md",
  "Event": "interface.md",
  "Method": "method.md",
  "Property": "property.md"
}

let branch;
let outputType;

const program = new Command();
program
  .option('-r, --reuse-branch', 'Create a page using the existing git branch.')
  .requiredOption('-i, --item-name <itemName>', 'The name of the item to create a page for.')

run();

async function run() {
  printWelcome();
  program.parse(process.argv);
  const outputType = await getOutputType();
  await resolveBranch();
  makeBoilerplate(outputType, program.itemName);
}

function printWelcome() {
  console.clear();
  console.log("=".repeat(80));
  console.log(" ".repeat(30) + "Welcome to Page Creator" + " ".repeat(29));
  console.log("=".repeat(80));
  console.log();
  let welcomeMessage = `Thank you for helping document the web platform. What you will create is part\n`;
  welcomeMessage += `off a reference site. It's more like a dictionary than a how-to guide. It\n`;
  welcomeMessage += `requires consistency for the sake of being quickly and easily scanable and\n`;
  welcomeMessage += `Please don't get creative. If you need to do something not covered by the\n`;
  welcomeMessage += `provided instructions, please post a message to chrome-puppy-discuss@.`;
  console.log(welcomeMessage);
  console.log();
}

async function getOutputType() {
  const prompt = new Select({
    name: 'outputType',
    message: 'What type of page do you want to create?',
    choices: ["CSS", "Interface", "Constructor", "Event", "Method", "Property", CANCEL]
  });
  let answer = await prompt.run();
  if (answer === CANCEL) { process.exit(); }
  return answer;
}

async function resolveBranch() {
  branch = await git("status -sb",
    (stdout) => stdout.match(/## (.*)/)[1]);
  if (branch.includes("puppy")) {
    branch = program.itemName;
    await git(`checkout -b ${branch}`);
    // console.log(`Pretending to create ${program.itemName} branch`);
    console.log(`\nYour work is in a new branch called ${branch}.\n`);
    return;
  } else {
    let reuse;
    if (program.reuseBranch){
      reuse = program.reuseBranch;
    } else {
      let prompt = `Do you want to use the ${branch} branch, created during the last run, for \n`;
      prompt += `  ${program.itemName}? Use the '-r' flag to avoid this question in the future.`;
      reuse = await confirm(prompt);
    }
    if (reuse) {
      console.log(`\nWork will be in your existing '${branch}' branch.\n`);
    } else {
      branch = program.itemName;
      git(`checkout -b ${branch} puppy`);
      console.log(`\nWork will be in a new branch called '${branch}'.\n`);
    }
  }
}

async function confirm(msg, initial = "true") {
  const prompt = new Confirm({
    name: 'confirm',
    message: msg,
    initial: initial,
    format: (v) => {
      return v ? 'yes' : 'no';
    }
  });
  return await prompt.run();
}

function makeBoilerplate(type, name) {
  let outPath;
  let templateName;
  let msg;
  if (type === 'CSS') {
    outPath = makeFolder(CSS_PATH);
    templateName = TEMPLATES[type];
    fs.copyFileSync(`${TEMPLATE_PATH}/${templateName}`, `${outPath}/${name}.md`);
    msg = `Page Creator has created a boilerplate at ${outPath}/${name}.md.\n\n`;
  } else if (type === 'Event') {
    outPath = makeFolder(API_PATH);
    templateName = TEMPLATES[type];
    fs.copyFileSync(`${TEMPLATE_PATH}/${templateName}`, `${outPath}/${name}.md`);
    templateName = TEMPLATES['Method'];
    fs.copyFileSync(`${TEMPLATE_PATH}/${templateName}`, `${outPath}/on${name}.md`);
    msg = `Page Creator has created a boilerplate for the event at ${outPath}/${name}.md\n`
    msg += `and a boilerplate or the event callback at ${outPath}/on${name}.md.\n`;
    msg += `For each file:\n\n`;
  } else {
    outPath = makeFolder(API_PATH);
    templateName = TEMPLATES[type];
    fs.copyFileSync(`${TEMPLATE_PATH}/${templateName}`, `${outPath}/${name}.md`);
    msg = `Page Creator has created a boilerplate at ${outPath}/${name}.md.\n\n`;
  }
  msg += `1. Open the file.\n`;
  msg += `2. Replace square-bracketed [[tokens]] with the specified information.\n`;
  msg += `3. Answer the questions in the file.\n`;
  msg += `4. Commit all new files to the '${branch}' branch and push them to origin.\n`;
  msg =+ `   Be sure not to include the package-lock.json.`
  msg += `5. Open a browser and go to https://github.com/GoogleChromeLabs/stumptown-content.git.\n`;
  msg += `6. Open a pull request against the default branch.\n\n`;
  msg += `Developer Relations will review your submission within a week and request\n`;
  msg += `changes, if needed.\n`;
  console.log(msg);
}


function makeFolder(dirName) {
  if (fs.existsSync(dirName)) { return dirName; }
  fs.mkdirSync(dirName);
  return dirName;
}
