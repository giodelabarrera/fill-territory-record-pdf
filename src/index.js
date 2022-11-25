#!/usr/bin/env node
const { join } = require("path");

const { createFilledPDF } = require("./create-filled-pdf.js");

const FROM_TERRITORY = 1;
const csvPath = join(__dirname, "assets", "registries.csv");

createFilledPDF(csvPath, FROM_TERRITORY);
