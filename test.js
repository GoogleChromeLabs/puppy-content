
'use strict';

process.env["NODE_CONFIG_DIR"] = `${__dirname}/node_modules/mdn-helper/config`;

const Utils = require('mdn-helper/utils.js');

let template = Utils.getTemplate('interface.html');
console.log(template);