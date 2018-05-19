#!/usr/bin/env node
const Parser = require('./parser.js');
const fileName = process.argv[2];
const transpile = process.argv[3];
const {readFileSync, writeFileSync} = require('fs');

const file = readFileSync(fileName).toString('utf8');

const arr = file.split('\r\n');

const parser = new Parser(arr);

const result = parser.parse();

if (transpile) {
    const newName = fileName.split('.');
    writeFileSync('./' + newName[0] + ".js", result.join('\n'));
    if (transpile == "mc") {
        const { compile } = require('nexe');
        compile({
            input: newName[0] + '.js'
        }).then(() => {
            console.log('Successfully transpiled ' + fileName + ' into ' + newName[0] + ' executable.');
        });
    } else {
        console.log('Successfully transpiled to JS');
    }
}
else {
    eval(result.join(''));
}
