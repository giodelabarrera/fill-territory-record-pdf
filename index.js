import { PDFDocument } from "pdf-lib";
import { writeFileSync, readFileSync, createReadStream } from "fs";
import path from "path";
import * as url from "url";

import { fillPDF } from "./pdfUtils.js";
import { mapCSVRowsToMap } from "./csvUtils.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

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
