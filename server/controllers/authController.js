import { registerAuthUser, setRole, userExists } from "../services/authService.js";

export const registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const userAlreadyExists = await userExists({ username: username, email: email });

    if (userAlreadyExists.withUsername || userAlreadyExists.withEmail) {
      return res.status(400).json({
        usernameExists: userAlreadyExists.withUsername,
        emailExists: userAlreadyExists.withEmail,
        error: "Username or email already exists",
      });
    }

    const newUser = await registerAuthUser(email, username, password, await setRole());
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error during registration", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const checkUserExistence = async (req, res) => {
  const { username, email } = req.body;

  try {
    const { withUsername, withEmail } = await userExists({ username, email });

    if (withUsername || withEmail) {
      return res.status(400).json({
        usernameExists: withUsername,
        emailExists: withEmail,
        message: "User already exists",
      });
    }

    return res.status(200).json({ message: "User can be registered" });
  } catch (error) {
    console.error("Error in checkUserExistence:", error);
    res.status(500).json({ message: "Server error" });
  }
};