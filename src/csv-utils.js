const csv = require("@fast-csv/parse");

async function mapCSVRowsToPagesMap(csvStream) {
  return new Promise((res, rej) => {
    /*
    Hashmap per page and in every page contains a record hashmap per territory
      [
        [1] => [
          [1] = [{}, {}, {}, {}],
          [2] = [{}],
          ...
          [20] = [{}, {}, {}, {}],
        ]
        [2] => [
          [1] = [{}, {}],
          ...
          [20] = [{}],
        ],
        [3] => [
          [21] = [{}, {}, {}],
          [22] = [{}, {}, {}],
          ...
          [30] = [{}, {}, {}, {}],
        ]
      ]
    */
    const pagesMap = new Map();

    let record;

    let group = 1;
    let firstPageOfGroup = 1;

    let territoryPage = firstPageOfGroup;
    let previousTerritory;

    csv
      .parseStream(csvStream, { headers: true })
      .on("error", rej)
      .on("data", (row) => {
        const {
          territory: originalTerritory,
          publisher,
          started_at: startedAt,
          finished_at: finishedAt,
        } = row;
        const territory = Number(originalTerritory);

        // is territory inside a new group
        // [1..20] group 1
        // [21..40] group 2
        // ...
        if (territory > 20 * group) {
          group = group + 1;
          firstPageOfGroup = [...pagesMap.keys()].length + 1;
        }

        // is different territory between csv rows
        if (territory !== previousTerritory) {
          previousTerritory = territory;
          territoryPage = 1;
        }

        record = createRecord(publisher, startedAt, finishedAt);

        if (!pagesMap.has(firstPageOfGroup * territoryPage)) {
          pagesMap.set(firstPageOfGroup * territoryPage, new Map());
        }

        const recordMap = pagesMap.get(firstPageOfGroup * territoryPage);
        if (!recordMap.has(territory)) {
          recordMap.set(territory, []);
        }

        recordMap.set(territory, [...recordMap.get(territory), record]);

        if (recordMap.get(territory).length === 4) {
          territoryPage = territoryPage + 1;
        }
      })
      .on("end", () => {
        res(pagesMap);
      });
  });
}

function createRecord(publisher, startedAt, finishedAt) {
  return {
    publisher,
    startedAt: new Date(startedAt),
    finishedAt: finishedAt ? new Date(finishedAt) : undefined,
  };
}

module.exports = { mapCSVRowsToPagesMap };
