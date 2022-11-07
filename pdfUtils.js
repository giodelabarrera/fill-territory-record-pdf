function fillTerritoryNumberToPDF(document, territoryIndex, territoryNumber) {
  const fieldName = getTerritoryFieldName(territoryIndex);
  const form = document.getForm();
  const field = form.getField(fieldName);
  field.setText(String(territoryNumber));
}

function fillRegistryToPDF(document, registryCell, registry) {
  const fieldNames = getRegistryFieldNames(registryCell);
  const form = document.getForm();

  const publisherField = form.getField(fieldNames.publisher);
  publisherField.setText(String(registry.publisher));

  const startDateField = form.getField(fieldNames.startDate);
  // TODO: format Date to ES
  startDateField.setText(String(registry.startDate));

  if (fieldNames.endDate) {
    const endDateField = form.getField(fieldNames.endDate);
    // TODO: format Date to ES
    endDateField.setText(String(registry.endDate));
  }
}

function getTerritoryFieldName(territoryNumber) {
  return `Terr_${territoryNumber}`;
}

function getPublisherFieldName(registryCell) {
  const NUMBER_OF_COLUMNS = 5;
  const { column, row } = registryCell;

  const cellNumber = column + NUMBER_OF_COLUMNS * (row - 1);
  const cellNumberStr = String(cellNumber).padStart(3, "0");
  return `Name_${cellNumberStr}`;
}

function getStartDateFieldName(registryCell) {
  const NUMBER_OF_COLUMNS = 10;
  const { column, row } = registryCell;

  const cellNumber = column + (column - 1) + NUMBER_OF_COLUMNS * (row - 1);
  const cellNumberStr = String(cellNumber).padStart(3, "0");
  return `Date_${cellNumberStr}`;
}

function getEndDateFieldName(registryCell) {
  const NUMBER_OF_COLUMNS = 10;
  const { column, row } = registryCell;

  const cellNumber = column * 2 + NUMBER_OF_COLUMNS * (row - 1);
  const cellNumberStr = String(cellNumber).padStart(3, "0");
  return `Date_${cellNumberStr}`;
}

function getRegistryFieldNames(registryCell) {
  return {
    publisher: getPublisherFieldName(registryCell),
    startDate: getStartDateFieldName(registryCell),
    endDate: getEndDateFieldName(registryCell),
  };
}

module.exports = {
  fillTerritoryNumberToPDF,
  fillRegistryToPDF,
  getTerritoryFieldName,
  getPublisherFieldName,
  getStartDateFieldName,
  getEndDateFieldName,
  getRegistryFieldNames,
};
