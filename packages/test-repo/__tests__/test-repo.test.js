'use strict';

const testRepo = require('..');
const assert = require('assert').strict;

assert.strictEqual(testRepo(), 'Hello from testRepo');
console.info('testRepo tests passed');
