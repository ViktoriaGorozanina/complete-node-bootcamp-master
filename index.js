const fs = require(`fs`); //fs-file system

const textIn = fs.readFileSync(`./1-node-farm/txt/input.txt`, `utf-8`);
console.log(textIn);

const textOut = `some text here lalala: ${textIn}.\n Created on ${Date.now()}`;
fs.writeFileSync(`./1-node-farm/txt/output.txt`, textOut);
console.log(`File created!`);
