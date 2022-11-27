const { PDFDocument } = require("pdf-lib");
const { createReadStream } = require("fs");
const { writeFile, readFile } = require("fs/promises");
const { join } = require("path");

const { fillPDF } = require("./pdf-utils.js");
const { mapCSVRowsToMap } = require("./csv-utils.js");

async function createRegistryPDF(csvPath, fromTerritory = 1, outDir = ".") {
  const csvStream = createReadStream(csvPath);
  const toTerritory = fromTerritory + 9;
  const registryMap = await mapCSVRowsToMap(
    csvStream,
    fromTerritory,
    toTerritory
  );

  const pdfBuffer = await readFile(join(__dirname, "assets", "S-13_S.pdf"));
  const document = await PDFDocument.load(pdfBuffer);
  fillPDF(document, registryMap);
  await writeFile(
    join(outDir, `S-13_S_${fromTerritory}_${toTerritory}.pdf`),
    await document.save()
  );
}

module.exports = { createRegistryPDF };
