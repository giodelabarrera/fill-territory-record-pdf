const { PDFDocument, TextAlignment } = require("pdf-lib");
const { writeFile, readFile } = require("fs/promises");
const { join } = require("path");

async function createTextFieldsPdf(outDir = ".") {
  const pdfBuffer = await readFile(join(__dirname, "S-13_S.pdf"));
  const document = await PDFDocument.load(pdfBuffer);

  createServiceYearField(document);
  createTerritoryNumberFields(document);
  createLastDateCompletedFields(document);
  createAssignedToFields(document);

  await writeFile(
    join(outDir, `created-text-fields-S-13_S.pdf`),
    await document.save()
  );
}

function createServiceYearField(document) {
  const TEXT_FIELD = "service_year";
  const form = document.getForm();
  const textField = form.createTextField(TEXT_FIELD);

  textField.addToPage(document.getPage(0), {
    x: 133,
    y: 746,
    width: 80,
    height: 16,
    borderWidth: 0,
  });
}

function createTerritoryNumberFields(document) {
  const TEXT_FIELD_BASE = "territory_number";
  const NUMBER_FIELDS = 20;

  const numbers = Array.from({ length: NUMBER_FIELDS }, (_, i) => i + 1);

  const baseY = 669;
  const height = 22;
  const border = 2;
  const gap = 7.25;
  const form = document.getForm();

  numbers.forEach((number, i) => {
    const textField = form.createTextField(`${TEXT_FIELD_BASE}_${number}`);
    const y = baseY - (height + border + gap) * i;

    textField.addToPage(document.getPage(0), {
      x: 40,
      y,
      width: 28,
      height,
      borderWidth: 0,
    });
  });
}

function createLastDateCompletedFields(document) {
  const TEXT_FIELD_BASE = "last_date_completed";
  const NUMBER_FIELDS = 20;

  const numbers = Array.from({ length: NUMBER_FIELDS }, (_, i) => i + 1);

  const baseY = 669;
  const height = 22;
  const border = 2;
  const gap = 7.25;
  const form = document.getForm();

  numbers.forEach((number, i) => {
    const textField = form.createTextField(`${TEXT_FIELD_BASE}_${number}`);
    const y = baseY - (height + border + gap) * i;

    textField.addToPage(document.getPage(0), {
      x: 73,
      y,
      width: 58,
      height,
      borderWidth: 0,
    });
  });
}

function createAssignedToFields(document) {
  const NUMBER_ROWS = 20;
  const NUMBER_COLUMNS = 4;

  const rows = Array.from({ length: NUMBER_ROWS }, (_, i) => i + 1);
  const columns = Array.from({ length: NUMBER_COLUMNS }, (_, i) => i + 1);

  rows.forEach((row, i) => {
    columns.forEach((column, j) => {
      createPublisherField(document, row, column);
      createStartedAtField(document, row, column);
      createFinishedAtField(document, row, column);
    });
  });
}

function createPublisherField(document, row, column) {
  const TEXT_FIELD_BASE = `assigned_to_${row}_${column}`;

  const baseY = 682;
  const rowGap = 17.3;
  const border = 2;
  const height = 12;
  const y = baseY - (height + border + rowGap) * (row - 1);

  const baseX = 139;
  const columnGap = 4.4;
  const width = 100;

  const form = document.getForm();
  const publisherTextField = form.createTextField(
    `${TEXT_FIELD_BASE}_publisher`
  );
  publisherTextField.setAlignment(TextAlignment.Center);

  const x = baseX + (width + border + columnGap) * (column - 1);
  publisherTextField.addToPage(document.getPage(0), {
    x,
    y,
    width,
    height,
    borderWidth: 0,
  });
}

function createStartedAtField(document, row, column) {
  const TEXT_FIELD_BASE = `assigned_to_${row}_${column}`;

  const baseY = 668;
  const rowGap = 17.4;
  const border = 2;
  const height = 12;
  const y = baseY - (height + border + rowGap) * (row - 1);

  const baseX = 139;
  const columnGap = 56.2;
  const width = 48;

  const form = document.getForm();
  const publisherTextField = form.createTextField(
    `${TEXT_FIELD_BASE}_started_at`
  );
  publisherTextField.setAlignment(TextAlignment.Center);

  const x = baseX + (width + border + columnGap) * (column - 1);
  publisherTextField.addToPage(document.getPage(0), {
    x,
    y,
    width,
    height,
    borderWidth: 0,
  });
}

function createFinishedAtField(document, row, column) {
  const TEXT_FIELD_BASE = `assigned_to_${row}_${column}`;

  const baseY = 668;
  const rowGap = 17.4;
  const border = 2;
  const height = 12;
  const y = baseY - (height + border + rowGap) * (row - 1);

  const baseX = 191;
  const columnGap = 56.5;
  const width = 48;

  const form = document.getForm();
  const publisherTextField = form.createTextField(
    `${TEXT_FIELD_BASE}_finished_at`
  );
  publisherTextField.setAlignment(TextAlignment.Center);

  const x = baseX + (width + border + columnGap) * (column - 1);
  publisherTextField.addToPage(document.getPage(0), {
    x,
    y,
    width,
    height,
    borderWidth: 0,
  });
}

createTextFieldsPdf();
