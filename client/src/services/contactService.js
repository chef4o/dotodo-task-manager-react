import * as request from "../api/request";
import { isEmail } from "validator";
import { url } from "../api/url";
import { ValidationError } from "../util/validation/validationErrorMessages";
import { ServiceError } from "./serviceErrorMessages";

const isValid = (formData, setError) => {
  if (!formData.name.trim() || (!formData.email.trim() && !formData.phone.trim()) || !formData.comment.trim()) {
    setError(ServiceError.MISSING_CONTACT_FIELDS);
    return false;
  } else if (formData.email && !isEmail(formData.email.trim())) {
    setError(ValidationError.INVALID_EMAIL);
    return false;
  }

  setError("");
  return true;
};

const sendMessage = async (formData) => {
  try {
    const response = await request.post(url.sendSupportMessage, formData);
    return response;
  } catch (error) {
    console.error(ServiceError.MESSAGE_NOT_SENT, error);
  }
};

export const contactForm = {
  isValid,
  sendMessage,
};
