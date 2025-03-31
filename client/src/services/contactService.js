import { isEmail } from "validator";
import { url } from "../api/url";
import * as request from "../api/request";

const isValid = (formData, setError) => {
  if (!formData.name.trim() || (!formData.email.trim() && !formData.phone.trim()) || !formData.comment.trim()) {
    setError("Name, email (or phone) and message are mandatory.");
    return false;
  } else if (formData.email && !isEmail(formData.email.trim())) {
    setError("Email must be valid.");
    return false;
  }

  return true;
};

const sendMessage = async (formData) => {
  try {
    const response = await request.post(url.sendSupportMessage, formData);
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

export const contactForm = {
  isValid,
  sendMessage,
};
