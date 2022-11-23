const csv = require("@fast-csv/parse");

const { createNumbersFromTo } = require("./utils.js");

async function mapCSVRowsToMap(csvStream, fromTerritory, toTerritory) {
  return new Promise((res, rej) => {
    const registryMap = new Map();
    createNumbersFromTo(fromTerritory, toTerritory).forEach(
      (territoryNumber) => {
        registryMap.set(territoryNumber, []);
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
        if (registryMap.has(territory)) {
          registryMap.set(territory, [
            ...registryMap.get(territory),
            {
              publisher,
              startDate: new Date(started_at),
              endDate: finished_at ? new Date(finished_at) : undefined,
            },
          ]);
        }
      })
      .on("end", () => {
        res(registryMap);
      });
  });
}

module.exports = { mapCSVRowsToMap };
