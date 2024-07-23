#!/usr/bin/env node

const { execSync } = require('child_process');

const readline = require('readline');

if (process.argv.length <= 2) {
    console.error('Usage: ./awsListNextToken.js <awsCommandLine>');
    process.exit(1);
}

const command = process.argv[2];

try {
  let output = execSync(command, { encoding: 'utf8' });
  //console.log(`Command output:\n${output}`);
  let jsonData = JSON.parse(output);
  console.log(output);
  // console.log('output JSON = ', jsonData);
  
   while (jsonData.NextToken) {
     let commandNext = command + ` --next-token ${jsonData.NextToken}`;
     //console.log('commandNext = ', commandNext);
     let output = execSync(commandNext, { encoding: 'utf8' });
     //console.log(`Command output:\n${output}`);
     jsonData = JSON.parse(output);
     console.log(output);
   }
} catch (error) {
  console.error(`Error executing command: ${error.message}`);
}
