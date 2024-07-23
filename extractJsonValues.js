#!/usr/bin/env node

const _ = require('lodash');

const readline = require('readline');

if (process.argv.length <= 2) {
    console.error('Usage: ./extractJsonValues.js <userRegex>');
    process.exit(1);
}

const userRegex = process.argv[2];
// console.log('userRegex = ', userRegex);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let input = '';

function getAllLeafNodes(obj, path = []) {
   return _.flatMap(_.toPairs(obj), ([key, value]) => {
     const currentPath = path.concat(key);
     return _.isObject(value) ? getAllLeafNodes(value, currentPath) : [{ path: currentPath.join('.'), value }];
  });
}

rl.on('line', (line) => {
  input += line;
});

rl.on('close', () => {
  try {
    const jsonData = JSON.parse(input);
    // console.log("json data = ", jsonData);
    
    const allLeafNodes = getAllLeafNodes(jsonData);
    // console.log('allLeafNodes =', allLeafNodes);

    const regex = new RegExp(userRegex);
    allLeafNodes.forEach(function(leaf) {
        // console.log('path= '+leaf.path);
        if (regex.test(leaf.path)) {
            // console.log('match --> '+leaf.path);
            console.log(leaf.value);
        }
    });
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
  }
});
