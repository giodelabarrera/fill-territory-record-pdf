const { PDFDocument } = require("pdf-lib");
const { writeFile, readFile } = require("fs/promises");
const { join } = require("path");

async function createFilledPDFs(pagesMap, outDir = ".") {
  for (const [page, recordMap] of pagesMap) {
    const pdfBuffer = await readFile(join(__dirname, "assets", "S-13_S.pdf"));
    const document = await PDFDocument.load(pdfBuffer);
    fillPDF(document, recordMap);
    await writeFile(
      join(outDir, `filled-S-13_S_${page}.pdf`),
      await document.save()
    );
  }
}

function fillPDF(document, recordMap) {
  // service year field
  const serviceYearField = "2024"; // TODO: get from params
  fillServiceYearField(document, serviceYearField);

  for (const [territoryNumber, records] of recordMap) {
    const row = mapValueToIndex(territoryNumber);

    // territory number
    fillTerritoryNumberField(document, row, territoryNumber);

    // records
    records.forEach((record, i) => {
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

function fillTerritoryNumberField(document, territoryIndex, value) {
  const TEXT_FIELD = "territory_number";

  const fieldName = `${TEXT_FIELD}_${territoryIndex}`;
  const form = document.getForm();
  const field = form.getField(fieldName);
  field.setText(String(value));
}

function fillRecordField(document, recordCell, record) {
  const form = document.getForm();
  const fieldNames = getRecordFieldNames(recordCell);

  const publisherField = form.getField(fieldNames.publisher);
  publisherField.setText(String(record.publisher));

  const startAtField = form.getField(fieldNames.startAt);
  startAtField.setText(formatRecordDate(record.startAt));

  if (record.finishedAt) {
    const finishedAtField = form.getField(fieldNames.finishedAt);
    finishedAtField.setText(formatRecordDate(record.finishedAt));
  }
}

function getRecordFieldNames(recordCell) {
  return {
    publisher: `assigned_to_${recordCell.row}_${recordCell.column}_publisher`,
    startAt: `assigned_to_${recordCell.row}_${recordCell.column}_started_at`,
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
