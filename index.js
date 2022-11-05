const { PDFDocument, StandardFonts } = require("pdf-lib");
const { writeFileSync, readFileSync } = require("fs");

async function createPDF() {
  const document = await PDFDocument.load(readFileSync("./S-13_S.pdf"));

  // add territory numbers
  const territoryNumbers = createTerritoryNumbers(1);
  addTerritoryNumbers(document, territoryNumbers);

  //   const fields = document.getForm().getFields();
  //   fields.forEach((field) => {
  //     // debugger;
  //     // const type = field.constructor.name;
  //     // const name = field.getName();
  //     // const text =
  //     if (field.getName().startsWith("Name")) {
  //       field.setText("Abril De la Barrera");
  //     }
  //     if (field.getName().startsWith("Date")) {
  //       field.setText("02/12/2022");
  //     }
  //     // console.log(`${type}: ${name} - ${text}`);
  //   });

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
