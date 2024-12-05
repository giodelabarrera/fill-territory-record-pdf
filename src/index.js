const { createReadStream } = require("fs");

const { createFilledPDFs } = require("./pdf-utils.js");
const { mapCSVRowsToPagesMap } = require("./csv-utils.js");

async function createFilledTerritoryRecordPDF(
  csvPath,
  outDir = ".",
  serviceYear = ""
) {
  const csvStream = createReadStream(csvPath);
  const pagesMap = await mapCSVRowsToPagesMap(csvStream);

  await createFilledPDFs(pagesMap, outDir, serviceYear);
}

module.exports = { createFilledTerritoryRecordPDF };
