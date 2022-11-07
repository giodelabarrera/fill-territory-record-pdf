export function getTerritoryFieldName(territoryNumber) {
  return `Terr_${territoryNumber}`;
}

export function getPublisherFieldName(registryCell) {
  const NUMBER_OF_COLUMNS = 5;
  const { column, row } = registryCell;

  const cellNumber = column + NUMBER_OF_COLUMNS * (row - 1);
  const cellNumberStr = String(cellNumber).padStart(3, "0");
  return `Name_${cellNumberStr}`;
}

export function getStartDateFieldName(registryCell) {
  const NUMBER_OF_COLUMNS = 10;
  const { column, row } = registryCell;

  const cellNumber = column + (column - 1) + NUMBER_OF_COLUMNS * (row - 1);
  const cellNumberStr = String(cellNumber).padStart(3, "0");
  return `Date_${cellNumberStr}`;
}

export function getEndDateFieldName(registryCell) {
  const NUMBER_OF_COLUMNS = 10;
  const { column, row } = registryCell;

  const cellNumber = column * 2 + NUMBER_OF_COLUMNS * (row - 1);
  const cellNumberStr = String(cellNumber).padStart(3, "0");
  return `Date_${cellNumberStr}`;
}

export function getRegistryFieldNames(registryCell) {
  return {
    publisher: getPublisherFieldName(registryCell),
    startDate: getStartDateFieldName(registryCell),
    endDate: getEndDateFieldName(registryCell),
  };
}
