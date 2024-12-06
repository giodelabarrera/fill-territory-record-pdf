const { PDFDocument } = require("pdf-lib");
const { writeFile, readFile } = require("fs/promises");
const { join } = require("path");

async function createFilledPDFs(pagesMap, outDir = ".", serviceYear) {
  for (const [page, recordMap] of pagesMap) {
    const pdfBuffer = await readFile(join(__dirname, "assets", "S-13_S.pdf"));
    const document = await PDFDocument.load(pdfBuffer);
    fillPDF(document, recordMap, serviceYear);
    await writeFile(
      join(outDir, `filled-S-13_S_${page}.pdf`),
      await document.save()
    );
  }
}

function fillPDF(document, recordMap, serviceYear) {
  // service year field
  const serviceYearField = serviceYear;
  fillServiceYearField(document, serviceYearField);

  for (const [territoryNumber, records] of recordMap) {
    debugger;
    const row = mapValueToIndex(territoryNumber);

    // territory number
    fillTerritoryNumberField(document, row, territoryNumber);

    // last date completed
    if (records.length === 4 && records[3].finishedAt) {
      fillLastDateCompletedField(document, row, records[3].finishedAt);
    }

    // records
    records.forEach((record, i) => {
      debugger;
      const column = i + 1;
      const recordCell = { row, column };
      fillRecordField(document, recordCell, record);
    });
  }
}

function mapValueToIndex(value) {
  const remainder = value % 20;
  return remainder === 0 ? 20 : remainder;
}

function fillServiceYearField(document, value) {
  const TEXT_FIELD = "service_year";

  const form = document.getForm();
  const field = form.getField(TEXT_FIELD);
  field.setText(String(value));
}

function fillLastDateCompletedField(document, territoryIndex, lastDate) {
  const TEXT_FIELD = "last_date_completed";

  const fieldName = `${TEXT_FIELD}_${territoryIndex}`;
  const form = document.getForm();
  const field = form.getField(fieldName);
  field.setText(formatRecordDate(lastDate));
}

function fillTerritoryNumberField(document, territoryIndex, value) {
  const TEXT_FIELD = "territory_number";

  const fieldName = `${TEXT_FIELD}_${territoryIndex}`;
  const form = document.getForm();
  const field = form.getField(fieldName);
  field.setText(String(value));
}

function fillRecordField(document, recordCell, record) {
  debugger;
  const form = document.getForm();
  const fieldNames = getRecordFieldNames(recordCell);

  const publisherField = form.getField(fieldNames.publisher);
  publisherField.setText(String(record.publisher));

  const startedAtField = form.getField(fieldNames.startedAt);
  startedAtField.setText(formatRecordDate(record.startedAt));

  if (record.finishedAt) {
    const finishedAtField = form.getField(fieldNames.finishedAt);
    finishedAtField.setText(formatRecordDate(record.finishedAt));
  }
}

function getRecordFieldNames(recordCell) {
  return {
    publisher: `assigned_to_${recordCell.row}_${recordCell.column}_publisher`,
    startedAt: `assigned_to_${recordCell.row}_${recordCell.column}_started_at`,
    finishedAt: `assigned_to_${recordCell.row}_${recordCell.column}_finished_at`,
  };
}

function formatRecordDate(date) {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

module.exports = { createFilledPDFs };
