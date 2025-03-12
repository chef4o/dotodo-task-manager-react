export const initialState = (fields) => {
  return Object.fromEntries(Object.keys(fields).map((key) => [key, ""]));
};

export const validationIsEmpty = (validationErrors) => {
  return Object.values(validationErrors).every((value) => !value);
};
