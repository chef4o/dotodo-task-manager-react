import { sendContactMessage } from "../services/contactService.js";

export const sendContactRequest = async (req, res) => {
  try {
    if (
      !req.body.name?.trim() ||
      !req.body.comment?.trim() ||
      (!req.body.email?.trim() && !req.body.phone?.trim())
    ) {
      return res.status(400).json({
        error: "Name, comment and either email or phone are mandatory.",
      });
    }

    await sendContactMessage(req.body);

    return res.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Error sending contact message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
