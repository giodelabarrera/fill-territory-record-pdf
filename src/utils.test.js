const { createNumbersFromTo } = require("./utils");

test("should get territory field name", () => {
  expect(createNumbersFromTo(1, 5)).toEqual([1, 2, 3, 4, 5]);
  expect(createNumbersFromTo(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  expect(createNumbersFromTo(2, 11)).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  expect(createNumbersFromTo(15, 20)).toEqual([15, 16, 17, 18, 19, 20]);
});
