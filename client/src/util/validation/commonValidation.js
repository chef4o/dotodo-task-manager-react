export const formInitialState = (fields) => {
  return Object.fromEntries(Object.keys(fields).map((key) => [key, ""]));
};

export const validationInitialState = (fields) => {
  return Object.fromEntries(Object.keys(fields).map((key) => [key, ""]));
};

export const commonValidations = {
  formInitialState,
  validationInitialState
};
