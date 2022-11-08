const { PDFDocument } = require("pdf-lib");
const { writeFileSync, readFileSync, createReadStream } = require("fs");
const path = require("path");

const { fillPDF } = require("./pdfUtils");
const { mapCSVRowsToMap } = require("./csvUtils");

const FROM_TERRITORY = 1;
const TO_TERRITORY = 10;

(async () => {
  const csvPath = path.resolve(__dirname, "registries.csv");
  const csvStream = createReadStream(csvPath);
  const registryMap = await mapCSVRowsToMap(
    csvStream,
    FROM_TERRITORY,
    TO_TERRITORY
  );

  const document = await PDFDocument.load(readFileSync("./S-13_S.pdf"));
  fillPDF(document, registryMap);
  writeFileSync(
    `S-13_S_${FROM_TERRITORY}_${TO_TERRITORY}.pdf`,
    await document.save()
  );
})();
