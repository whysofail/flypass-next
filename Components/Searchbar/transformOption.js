export const transformOption = (options, valueCallback, labelCallback) => {
  return options.map((option) => ({
    value: valueCallback(option),
    label: labelCallback(option),
  }));
};
