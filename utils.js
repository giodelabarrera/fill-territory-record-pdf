function createNumbersFromTo(from, to) {
  return Array.from({ length: to }, (_, i) => from + i);
}

module.exports = {
  createNumbersFromTo,
};
