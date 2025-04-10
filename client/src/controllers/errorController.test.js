import { describe, it, expect } from "vitest";
import { formEmptyFieldsHandler, emptyField } from "./errorController";

describe("emptyField", () => {
  it("returns true when at least one field is empty", () => {
    const formValues = { name: "   ", email: "test@abv.bg" };
    expect(emptyField(formValues)).toBe(true);
  });

  it("returns false when no field is empty", () => {
    const formValues = { name: "test", email: "test@abv.bg" };
    expect(emptyField(formValues)).toBe(false);
  });
});

describe("formEmptyFieldsHandler", () => {
  it("updates errors correctly when at least one field is empty", () => {
    const initialState = { name: "", email: "" };
    const formValues = { name: "   ", email: "test@abv.bg" };
    const additionalFields = { error: "message" };

    let state = {};
    const setValidationErrors = (updater) => {
      state = updater(state);
    };

    formEmptyFieldsHandler(initialState, formValues, additionalFields, setValidationErrors);

    expect(state).toEqual({
      error: "message",
      name: "Name is required",
      email: "",
    });
  });

  it("resets errors to the initial error state when no field is empty", () => {
    const initialState = { name: "", email: "" };
    const formValues = { name: "teest", email: "test@abv.bg" };

    const additionalFields = { error: "message" };

    let state = { preExisting: "value" };
    const setValidationErrors = (updater) => {
      state = updater(state);
    };

    formEmptyFieldsHandler(initialState, formValues, additionalFields, setValidationErrors);
    expect(state).toEqual({
      preExisting: "value",
      name: "",
      email: "",
    });
  });
});
