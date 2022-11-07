import {
  getEndDateFieldName,
  getPublisherFieldName,
  getRegistryFieldNames,
  getStartDateFieldName,
} from "./index";

test("retrieve publisher field name", () => {
  expect(getPublisherFieldName({ column: 1, row: 1 })).toEqual("Name_001");
  expect(getPublisherFieldName({ column: 1, row: 2 })).toEqual("Name_006");
  expect(getPublisherFieldName({ column: 2, row: 1 })).toEqual("Name_002");
  expect(getPublisherFieldName({ column: 5, row: 1 })).toEqual("Name_005");
  expect(getPublisherFieldName({ column: 5, row: 8 })).toEqual("Name_040");
});

test("retrieve start date field name", () => {
  expect(getStartDateFieldName({ column: 1, row: 1 })).toEqual("Date_001");
  expect(getStartDateFieldName({ column: 1, row: 2 })).toEqual("Date_011");
  expect(getStartDateFieldName({ column: 2, row: 1 })).toEqual("Date_003");
  expect(getStartDateFieldName({ column: 5, row: 1 })).toEqual("Date_009");
  expect(getStartDateFieldName({ column: 5, row: 8 })).toEqual("Date_079");
});

test("retrieve end date field name", () => {
  expect(getEndDateFieldName({ column: 1, row: 1 })).toEqual("Date_002");
  expect(getEndDateFieldName({ column: 1, row: 2 })).toEqual("Date_012");
  expect(getEndDateFieldName({ column: 2, row: 1 })).toEqual("Date_004");
  expect(getEndDateFieldName({ column: 5, row: 1 })).toEqual("Date_010");
  expect(getEndDateFieldName({ column: 5, row: 8 })).toEqual("Date_080");
});

test("retrieve registry cell meta", () => {
  expect(getRegistryFieldNames({ column: 1, row: 12 })).toEqual({
    publisher: "Name_056",
    startDate: "Date_111",
    endDate: "Date_112",
  });
  expect(getRegistryFieldNames({ column: 2, row: 12 })).toEqual({
    publisher: "Name_057",
    startDate: "Date_113",
    endDate: "Date_114",
  });
  expect(getRegistryFieldNames({ column: 3, row: 12 })).toEqual({
    publisher: "Name_058",
    startDate: "Date_115",
    endDate: "Date_116",
  });
  expect(getRegistryFieldNames({ column: 4, row: 12 })).toEqual({
    publisher: "Name_059",
    startDate: "Date_117",
    endDate: "Date_118",
  });
  expect(getRegistryFieldNames({ column: 5, row: 12 })).toEqual({
    publisher: "Name_060",
    startDate: "Date_119",
    endDate: "Date_120",
  });
});
