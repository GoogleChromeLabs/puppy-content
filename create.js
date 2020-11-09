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

const git = require("git-promise");

const { Command } = require('commander');
const { Confirm, Select } = require('enquirer');

const CANCEL = "(Cancel)";

const CREATION_PATH='content/en-US';
const API_PATH = `${CREATION_PATH}/api`;
const CSS_PATH = `${CREATION_PATH}/css`


const program = new Command();
program
  .option('-r, --reuse-branch', 'Create a page using the existing git branch.')
  .requiredOption('-i, --item-name <itemName>', 'The name of the item to create a page for.')

run();

async function run() {
  program.parse(process.argv);
  const outputType = await getOutputType();
  resolveBranch();
  makeTemplate();
}

async function getOutputType() {
  const prompt = new Select({
    name: 'outputType',
    message: 'For which type of identifier do you need to create a page?',
    choices: ["CSS", "Interface", "Constructor", "Event", "Method", "Property", CANCEL]
  });
  let answer = await prompt.run();
  console.log(answer);
  if (answer === CANCEL) { process.exit(); }
  return answer;
}

async function resolveBranch() {
  let branch = await git("status -sb",
    (stdout) => stdout.match(/## (.*)/)[1]);
  if (branch.includes("ketchup")) {
    branch = await git(`checkout -b ${program.itemName}`);
    // console.log(`Pretending to create ${program.itemName} branch`);
    console.log(`Work will be in a new branch called ${program.itemName}`);
    return;
  } else {
    let reuse;
    if (program.reuseBranch){
      reuse = program.reuseBranch;
    } else {
      let prompt = `Do you want to use the new branch for ${program.itemName}?`;
      prompt = `${prompt}\n\nUse the '-r' flag to avoid this question in the future.`
      reuse = await confirm(prompt);
    }
    if (reuse) {
      console.log(`\nWork will be in your existing '${branch}' branch.\n`);
    } else {
      branch = await git(`checkout -b ${program.itemName} ketchup`);
      console.log(`\nWork will be in a new branch called ${program.itemName}`);
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

function makeTemplate() {

}