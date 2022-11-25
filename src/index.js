#!/usr/bin/env node
const yargsParser = require("yargs-parser");

const { createFilledPDF } = require("./create-filled-pdf.js");

let args = process.argv.slice(2);
const parsedArgs = yargsParser(args);

const csvPath = parsedArgs._[0];
const fromTerritory = Number(parsedArgs._[1]);
const outDir = parsedArgs.outDir || process.cwd();

createFilledPDF(csvPath, fromTerritory, outDir);
