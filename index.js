const { PDFDocument, StandardFonts } = require("pdf-lib");
const { writeFileSync, readFileSync } = require("fs");

async function createPDF() {
  const document = await PDFDocument.load(readFileSync("./S-13_S.pdf"));

  // add territory numbers
  const territoryNumbers = createTerritoryNumbers(11);
  addTerritoryNumbers(document, territoryNumbers);

  const fields = document.getForm().getFields();
  fields.forEach((field) => {
    // const type = field.constructor.name;
    const name = field.getName();
    field.setText(name);

    // if (field.getName().startsWith("Name")) {
    // }
    // if (field.getName().startsWith("Date")) {
    //   field.setText("02/12/2022");
    // }
    // console.log(`${type}: ${name} - ${text}`);
  });

  //   const courierBoldFont = await document.embedFont(StandardFonts.Courier);
  //   const firstPage = document.getPage(0);

  //   firstPage.moveTo(72, 570);
  //   firstPage.drawText(new Date().toUTCString(), {
  //     font: courierBoldFont,
  //     size: 12,
  //   });

  //   firstPage.moveTo(105, 530);
  //   firstPage.drawText("Ms. Jane,", {
  //     font: courierBoldFont,
  //     size: 12,
  //   });

  //   firstPage.moveTo(72, 330);
  //   firstPage.drawText("John Doe \nSr. Vice President Engineering \nLogRocket", {
  //     font: courierBoldFont,
  //     size: 12,
  //     lineHeight: 10,
  //   });

  writeFileSync("S-13_S_fill.pdf", await document.save());
}

function createTerritoryNumbers(
  startTerritoryNumber,
  territoryNumbersLen = 10
) {
  return Array.from(
    { length: territoryNumbersLen },
    (_, i) => startTerritoryNumber + i
  );
}

function addTerritoryNumbers(document, territoryNumbers) {
  const form = document.getForm();

  const pdfTerritoryNumbers = createTerritoryNumbers(1);
  pdfTerritoryNumbers.forEach((pdfTerritoryNumber, index) => {
    const fieldName = `Terr_${pdfTerritoryNumber}`;
    const field = form.getField(fieldName);
    field.setText(String(territoryNumbers[index]));
  });
  // form.getField("Name_001").setText("Name_001");
  // form.getField("Date_001").setText("Date_001");
  // form.getField("Date_002").setText("Date_002");
  // form.getField("Name_002").setText("Name_002");
  // form.getField("Date_004").setText("Date_004");
  // form.getField("Date_005").setText("Date_005");
  // form.getField("Name_005").setText("Name_005");
  // form.getField("Date_011").setText("Date_011");
  // form.getField("Date_012").setText("Date_012");
  // form.getField("Name_006").setText("Name_006");
  // form.getField("Date_013").setText("Date_013");
  // form.getField("Date_014").setText("Date_014");
}

createPDF().catch((err) => console.log(err));

/*
Terr_1
Terr_6
Terr_10
Name_001
Name_002
Date_001
Date_254
Date_381
*/

// TODO
// write territory numbers

// registries
// number
// is there number?
// is number 1
// Name_001

export function getPublisherFieldName(registryCell) {
  const NUMBER_OF_COLUMNS = 5;
  const { column, row } = registryCell;

  const cellNumber = column + NUMBER_OF_COLUMNS * (row - 1);
  const cellNumberStr = String(cellNumber).padStart(3, "0");
  return `Name_${cellNumberStr}`;
}

export function getStartDateFieldName(registryCell) {
  const NUMBER_OF_COLUMNS = 10;
  const { column, row } = registryCell;

  const cellNumber = column + (column - 1) + NUMBER_OF_COLUMNS * (row - 1);
  const cellNumberStr = String(cellNumber).padStart(3, "0");
  return `Date_${cellNumberStr}`;
}

export function getEndDateFieldName(registryCell) {
  const NUMBER_OF_COLUMNS = 10;
  const { column, row } = registryCell;

  const cellNumber = column * 2 + NUMBER_OF_COLUMNS * (row - 1);
  const cellNumberStr = String(cellNumber).padStart(3, "0");
  return `Date_${cellNumberStr}`;
}

export function getRegistryFieldNames(registryCell) {
  return {
    publisher: getPublisherFieldName(registryCell),
    startDate: getStartDateFieldName(registryCell),
    endDate: getEndDateFieldName(registryCell),
  };
}

export function addRegistry(document, columnNumber, columnFile, registry) {}
