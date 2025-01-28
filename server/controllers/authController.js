import { registerAuthUser, userExists } from "../services/authService.js";

export const registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const userAlreadyExists = await userExists(username, email);

    if (userAlreadyExists.withUsername || userAlreadyExists.withEmail) {
      return res.status(400).json({
        error: "Username or email already exists",
      });
    }

    const newUser = await registerAuthUser(email, username, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error during registration", error);
    res.status(500).json({ error: "Internal server error" });
  }
};