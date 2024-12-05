#!/usr/bin/env node
const yargsParser = require("yargs-parser");

const { createFilledTerritoryRecordPDF } = require("../src/index.js");

const args = process.argv.slice(2);
const parsedArgs = yargsParser(args);

const csvPath = parsedArgs._[0];
const outDir = parsedArgs.outDir || process.cwd();
const serviceYear = parsedArgs.serviceYear || ''

createFilledTerritoryRecordPDF(csvPath, outDir, serviceYear);
