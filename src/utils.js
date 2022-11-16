function createNumbersFromTo(from, to) {
  return Array.from({ length: to - (from - 1) }, (_, i) => from + i);
}

export { createNumbersFromTo };
