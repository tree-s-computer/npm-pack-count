'use strict';

const countView = require('..');
const assert = require('assert').strict;

assert.strictEqual(countView(), 'Hello from countView');
console.info('countView tests passed');
