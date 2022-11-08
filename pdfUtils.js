const { PDFDocument } = require("pdf-lib");
const { writeFileSync, readFileSync } = require("fs");

const { createNumbersFromTo } = require("./utils");

async function createFilledPDF(registryMap, outputPath) {
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

  writeFileSync(outputPath, await document.save());
}

function fillTerritoryNumberToPDF(document, territoryIndex, territoryNumber) {
  const fieldName = getTerritoryFieldName(territoryIndex);
  const form = document.getForm();
  const field = form.getField(fieldName);
  field.setText(String(territoryNumber));
}

function fillRegistryToPDF(document, registryCell, registry) {
  const fieldNames = getRegistryFieldNames(registryCell);
  const form = document.getForm();

  const publisherField = form.getField(fieldNames.publisher);
  publisherField.setText(String(registry.publisher));

  const startDateField = form.getField(fieldNames.startDate);

  startDateField.setText(formatRegistryDate(registry.startDate));

  if (registry.endDate) {
    const endDateField = form.getField(fieldNames.endDate);
    endDateField.setText(formatRegistryDate(registry.endDate));
  }
}

function formatRegistryDate(date) {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function getTerritoryFieldName(territoryNumber) {
  return `Terr_${territoryNumber}`;
}

function getPublisherFieldName(registryCell) {
  const NUMBER_OF_COLUMNS = 5;
  const { column, row } = registryCell;

  const cellNumber = column + NUMBER_OF_COLUMNS * (row - 1);
  const cellNumberStr = String(cellNumber).padStart(3, "0");
  return `Name_${cellNumberStr}`;
}

function getStartDateFieldName(registryCell) {
  const NUMBER_OF_COLUMNS = 10;
  const { column, row } = registryCell;

  const cellNumber = column + (column - 1) + NUMBER_OF_COLUMNS * (row - 1);
  const cellNumberStr = String(cellNumber).padStart(3, "0");
  return `Date_${cellNumberStr}`;
}

function getEndDateFieldName(registryCell) {
  const NUMBER_OF_COLUMNS = 10;
  const { column, row } = registryCell;

  const cellNumber = column * 2 + NUMBER_OF_COLUMNS * (row - 1);
  const cellNumberStr = String(cellNumber).padStart(3, "0");
  return `Date_${cellNumberStr}`;
}

function getRegistryFieldNames(registryCell) {
  return {
    publisher: getPublisherFieldName(registryCell),
    startDate: getStartDateFieldName(registryCell),
    endDate: getEndDateFieldName(registryCell),
  };
}

module.exports = {
  createFilledPDF,
  fillTerritoryNumberToPDF,
  fillRegistryToPDF,
  getTerritoryFieldName,
  getPublisherFieldName,
  getStartDateFieldName,
  getEndDateFieldName,
  getRegistryFieldNames,
};
