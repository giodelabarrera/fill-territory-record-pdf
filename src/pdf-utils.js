const { createNumbersFromTo } = require("./utils.js");

function fillPDF(document, recordMap) {
  const territoryNumbers = Array.from(recordMap.keys());
  const territoryIndices = createNumbersFromTo(1, recordMap.size);

  // fill territory number
  territoryNumbers.forEach((territoryNumber, index) => {
    fillTerritoryNumberToPDF(
      document,
      territoryIndices[index],
      territoryNumber
    );
  });

  // fill records
  territoryNumbers.forEach((territoryNumber, index) => {
    const records = recordMap.get(territoryNumber);
    const isSecondPage = territoryIndices[index] > 5;
    const column = isSecondPage
      ? territoryIndices[index] - 5
      : territoryIndices[index];

    records.forEach((record, index) => {
      const ROWS_BY_PAGE = 25;
      if (index < ROWS_BY_PAGE) {
        const row = isSecondPage ? ROWS_BY_PAGE + index + 1 : index + 1;
        const recordCell = { column, row };
        fillRecordToPDF(document, recordCell, record);
      }
    });
  });
}

function fillTerritoryNumberToPDF(document, territoryIndex, territoryNumber) {
  const fieldName = getTerritoryFieldName(territoryIndex);
  const form = document.getForm();
  const field = form.getField(fieldName);
  field.setText(String(territoryNumber));
}

function fillRecordToPDF(document, recordCell, record) {
  const fieldNames = getRecordFieldNames(recordCell);
  const form = document.getForm();

  const publisherField = form.getField(fieldNames.publisher);
  publisherField.setText(String(record.publisher));

  const startDateField = form.getField(fieldNames.startDate);

  startDateField.setText(formatRecordDate(record.startDate));

  if (record.endDate) {
    const endDateField = form.getField(fieldNames.endDate);
    endDateField.setText(formatRecordDate(record.endDate));
  }
}

function formatRecordDate(date) {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function getTerritoryFieldName(territoryNumber) {
  return `Terr_${territoryNumber}`;
}

function getPublisherFieldName(recordCell) {
  const NUMBER_OF_COLUMNS = 5;
  const { column, row } = recordCell;

  const cellNumber = column + NUMBER_OF_COLUMNS * (row - 1);
  const cellNumberStr = String(cellNumber).padStart(3, "0");
  return `Name_${cellNumberStr}`;
}

function getStartDateFieldName(recordCell) {
  const NUMBER_OF_COLUMNS = 10;
  const { column, row } = recordCell;

  const cellNumber = column + (column - 1) + NUMBER_OF_COLUMNS * (row - 1);
  const cellNumberStr = String(cellNumber).padStart(3, "0");
  return `Date_${cellNumberStr}`;
}

function getEndDateFieldName(recordCell) {
  const NUMBER_OF_COLUMNS = 10;
  const { column, row } = recordCell;

  const cellNumber = column * 2 + NUMBER_OF_COLUMNS * (row - 1);
  const cellNumberStr = String(cellNumber).padStart(3, "0");
  return `Date_${cellNumberStr}`;
}

function getRecordFieldNames(recordCell) {
  return {
    publisher: getPublisherFieldName(recordCell),
    startDate: getStartDateFieldName(recordCell),
    endDate: getEndDateFieldName(recordCell),
  };
}

module.exports = {
  fillPDF,
  fillTerritoryNumberToPDF,
  fillRecordToPDF,
  getTerritoryFieldName,
  getPublisherFieldName,
  getStartDateFieldName,
  getEndDateFieldName,
  getRecordFieldNames,
};
