import schema, { typeLookup, labeledDataTpl } from '../config/schema/schema';

const schemaLabelsTpl: StringLookup = {};

const reduceEntriesToLabeledData = (
  acc: LabeledData,
  [key, value]: [string, LabeledDataProp],
): LabeledData => ({ ...acc, [key]: value });

const reduceEntriesToObject = (
  acc: StringLookup,
  [key, value]: [string, string],
): StringLookup => ({ ...acc, [key]: value });

const applyLabels = (documents: Data[]): LabeledData[] =>
  documents.map(node =>
    Object.entries(node)
      .map(mapEntries)
      .reduce(reduceEntriesToLabeledData, labeledDataTpl),
  );

const mapEntries = ([key, value]: [string, DataProp]): [
  string,
  LabeledDataProp
] => {
  if (typeLookup[key] === 'selectOne' && typeof value === 'string')
    return [key, { label: schema.selectOne[key].options[value], value }];
  if (
    typeLookup[key] === 'selectMultiple' &&
    typeof value !== 'string' &&
    typeof value !== 'number'
  ) {
    const selectMultipleValues = value.map(value2 => ({
      label: schema.selectMultiple[key].options[value2],
      value: value2,
    }));
    return [key, selectMultipleValues];
  }
  if (
    typeLookup[key] === 'selectMultipleGrouped' &&
    typeof value !== 'string' &&
    typeof value !== 'number'
  ) {
    const selectMultipleGroupedValues = value.map(value2 => {
      const schemaLabels = Object.values(
        schema.selectMultipleGrouped[key].options,
      )
        .flatMap(e => Object.entries(e))
        .reduce(reduceEntriesToObject, schemaLabelsTpl);
      return { label: schemaLabels[value2], value: value2 };
    });
    return [key, selectMultipleGroupedValues];
  }
  if (typeof value === 'string' || typeof value === 'number')
    return [key, value];
  return [key, ''];
};

export default applyLabels;
