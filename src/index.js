import { PDFDocument } from "pdf-lib";
import { createReadStream } from "fs";
import { writeFile, readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { fillPDF } from "./pdf-utils.js";
import { mapCSVRowsToMap } from "./csv-utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const FROM_TERRITORY = 1;
const TO_TERRITORY = 10;

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
