const { createFilledPDF } = require("./pdfUtils");
const { createNumbersFromTo } = require("./utils");

const registryMap = new Map();
registryMap.set(11, [
  {
    publisher: "Giorgio de la Barrera",
    startDate: new Date("2022-09-01"),
    endDate: new Date("2022-11-02"),
  },
  {
    publisher: "Dalila Taborda",
    startDate: new Date("2022-09-03"),
    endDate: undefined,
  },
]);
registryMap.set(12, [
  {
    publisher: "Jacob de la Barrera",
    startDate: new Date("2022-09-04"),
    endDate: new Date("2022-11-05"),
  },
]);
createNumbersFromTo(13, 20).forEach((number) => {
  registryMap.set(number, []);
});
createFilledPDF(registryMap, "S-13_S_fill.pdf").catch((err) =>
  console.log(err)
);
