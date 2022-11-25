const { PDFDocument } = require("pdf-lib");
const { createReadStream } = require("fs");
const { writeFile, readFile } = require("fs/promises");
const { join } = require("path");

const { fillPDF } = require("./pdf-utils.js");
const { mapCSVRowsToMap } = require("./csv-utils.js");

const FROM_TERRITORY = 1;
const TO_TERRITORY = 10;

(async () => {
  const csvPath = join(__dirname, "assets", "registries.csv");
  const csvStream = createReadStream(csvPath);
  const registryMap = await mapCSVRowsToMap(
    csvStream,
    FROM_TERRITORY,
    TO_TERRITORY
  );

  const pdfBuffer = await readFile(join(__dirname, "assets", "S-13_S.pdf"));
  const document = await PDFDocument.load(pdfBuffer);
  fillPDF(document, registryMap);
  await writeFile(
    join(__dirname, `S-13_S_${FROM_TERRITORY}_${TO_TERRITORY}.pdf`),
    await document.save()
  );
})();
