const { PDFDocument, StandardFonts } = require("pdf-lib");
const { writeFileSync, readFileSync } = require("fs");

const { fillTerritoryNumberToPDF } = require("./pdfUtils");

async function createFilledPDF(registryMap) {
  const document = await PDFDocument.load(readFileSync("./S-13_S.pdf"));
  const form = document.getForm();

  // fill territory numbers
  const territoryNumbers = Array.from(registryMap.keys());
  const territoryIndices = createNumbersFromTo(1, 10);
  territoryIndices.forEach((territoryIndex, index) => {
    fillTerritoryNumberToPDF(document, territoryIndex, territoryNumbers[index]);
  });

  // TODO: fill registry cells

  writeFileSync("S-13_S_fill.pdf", await document.save());
}

function createNumbersFromTo(from, to) {
  return Array.from({ length: to }, (_, i) => from + i);
}

const registryMap = new Map();
createNumbersFromTo(1, 10).forEach((number) => {
  registryMap.set(number, []);
});
createFilledPDF(registryMap).catch((err) => console.log(err));
