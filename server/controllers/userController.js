import {
  deleteUser,
  editUserById,
  findAllUsers,
  findUserByEmail,
  findUserById,
  findUserByUsername,
} from "../services/userService.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();

    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.json(users);
  } catch (error) {
    console.error("Error fetching users from Firestore:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error fetching user by email: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error fetching user by username: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userData = await findUserById(req.params.id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(userData);
  } catch (error) {
    console.error("Error in getUserById from Firestore: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const doc = await deleteUser(req.params.id);

    if (!doc) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    console.error("Error in deleteUserById from Firestore: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id || !updatedData) {
      return res.status(400).json({ error: "User ID and updated data are required" });
    }

    const updatedUser = await editUserById(id, updatedData);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found or update failed" });
    }

    return res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
