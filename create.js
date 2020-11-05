// Copyright 2019 Google LLC
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
const { Select } = require('enquirer');

const program = new Command();
program
  .option('-r, --reuse-branch', 'Create new pages using the existing git branch.')
  .option('-i, --item-name <itemName>', 'The name of the item to create a page for.')



program.parse(process.argv);
resolveBranch();

async function resolveBranch() {
  let branch = await git("status -sb",
    (stdout) => stdout.match(/## (.*)/)[1]);
  if (branch.includes("ketchup")) {
    branch = await git(`checkout -b ${program.itemName}`);
  }
  if (!program.reuseBranch) {
    branch = await git (`checkout -b ${program.itemName}`);
  }
}