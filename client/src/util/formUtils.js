const handleInputChange = (setFormValues) => (e) => {
  const { name, value } = e.target;
  setFormValues((state) => ({
    ...state,
    [name]: value,
  }));
};

const focusHandler = (validationFunction, setValidationErrors, ...formValues) => {
  validationFunction(setValidationErrors, ...formValues);
};

export const formUtils = {
  handleInputChange,
  focusHandler,
};
