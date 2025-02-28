const handleInputChange = (setFormValues, setValidationErrors) => (e) => {
  const { name, value } = e.target;
  setFormValues((state) => ({
    ...state,
    [name]: value,
  }));

  setValidationErrors((state) => ({
    ...state,
    [name]: value.trim() ? "" : state[name],
  }));
};

const focusHandler = (validationFunction, setValidationErrors, ...formValues) => {
  validationFunction(setValidationErrors, ...formValues);
};

export const formUtils = {
  handleInputChange,
  focusHandler,
};
