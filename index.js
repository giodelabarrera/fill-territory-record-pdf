const { PDFDocument } = require("pdf-lib");
const { writeFileSync, readFileSync } = require("fs");

const { fillTerritoryNumberToPDF, fillRegistryToPDF } = require("./pdfUtils");

async function createFilledPDF(registryMap) {
  const document = await PDFDocument.load(readFileSync("./S-13_S.pdf"));

  const territoryNumbers = Array.from(registryMap.keys());
  const territoryIndices = createNumbersFromTo(1, 10);

  // fill territory number
  territoryIndices.forEach((territoryIndex, index) => {
    fillTerritoryNumberToPDF(document, territoryIndex, territoryNumbers[index]);
  });

  // fill registries
  territoryIndices.forEach((territoryIndex, index) => {
    const registries = registryMap.get(territoryNumbers[index]);

    registries.forEach((registry, index) => {
      const registryCell = { column: territoryIndex, row: index + 1 };
      fillRegistryToPDF(document, registryCell, registry);
    });
  });

  writeFileSync("S-13_S_fill.pdf", await document.save());
}

function createNumbersFromTo(from, to) {
  return Array.from({ length: to }, (_, i) => from + i);
}

const registryMap = new Map();
registryMap.set(1, [
  {
    publisher: "Giorgio de la Barrera",
    startDate: new Date("2022-09-01"),
    endDate: new Date("2022-11-02"),
  },
  {
    publisher: "Dalila Taborda",
    startDate: new Date("2022-09-03"),
    endDate: undefined,
  },
]);
registryMap.set(2, [
  {
    publisher: "Jacob de la Barrera",
    startDate: new Date("2022-09-04"),
    endDate: new Date("2022-11-05"),
  },
]);
createNumbersFromTo(3, 10).forEach((number) => {
  registryMap.set(number, []);
});
createFilledPDF(registryMap).catch((err) => console.log(err));
