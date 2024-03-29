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

// Use MDN Helper's config for now.
// process.env["NODE_CONFIG_DIR"] = `${__dirname}/node_modules/@jpmedley/mdn-helper/config`;

const { Generator } = require('./generator.js');

const sourceFile = process.argv[2];
const generator = new Generator(sourceFile);
generator.generate();