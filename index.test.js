import { getRegistryCellMeta } from "./index";

test("retrieve registry cell meta", () => {
  expect(getRegistryCellMeta(1, 1)).toEqual({
    publisher: "Name_001",
    startDate: "Date_001",
    endDate: "Date_002",
  });

  expect(getRegistryCellMeta(1, 2)).toEqual({
    publisher: "Name_006",
    startDate: "Date_011",
    endDate: "Date_012",
  });

  expect(getRegistryCellMeta(2, 1)).toEqual({
    publisher: "Name_002",
    startDate: "Date_003",
    endDate: "Date_004",
  });

  expect(getRegistryCellMeta(5, 11)).toEqual({
    publisher: "Name_055",
    startDate: "Date_109",
    endDate: "Date_110",
  });
});
