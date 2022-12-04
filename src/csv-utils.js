const csv = require("@fast-csv/parse");

const { createNumbersFromTo } = require("./utils.js");

async function mapCSVRowsToMap(csvStream, fromTerritory, toTerritory) {
  return new Promise((res, rej) => {
    const recordMap = new Map();
    createNumbersFromTo(fromTerritory, toTerritory).forEach(
      (territoryNumber) => {
        recordMap.set(territoryNumber, []);
      }
    );

    csv
      .parseStream(csvStream, { headers: true })
      .on("error", rej)
      .on("data", (row) => {
        const {
          territory: originalTerritory,
          publisher,
          started_at,
          finished_at,
        } = row;
        const territory = Number(originalTerritory);
        if (recordMap.has(territory)) {
          recordMap.set(territory, [
            ...recordMap.get(territory),
            {
              publisher,
              startDate: new Date(started_at),
              endDate: finished_at ? new Date(finished_at) : undefined,
            },
          ]);
        }
      })
      .on("end", () => {
        res(recordMap);
      });
  });
}

module.exports = { mapCSVRowsToMap };
