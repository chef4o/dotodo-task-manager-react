import {
  findAllChecklistsByUser,
  findChecklistById,
  deleteChecklistById,
  editChecklistById,
  addChecklist,
} from "../services/checklistService.js";

export const getAllChecklistsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const checklists = await findAllChecklistsByUser(userId);

    if (!checklists) {
      return res.status(404).json({ message: "No checklists found" });
    }

    return res.json(checklists);
  } catch (error) {
    console.error("Error fetching checklists from Firestore:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getChecklist = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Checklist ID is required" });
    }

    const checklist = await findChecklistById(id);

    if (!checklist) {
      return res.status(404).json({ message: "Checklist not found" });
    }

    return res.json(checklist);
  } catch (error) {
    console.error("Error fetching checklist by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteChecklist = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Checklist ID is required" });
    }

    const doc = await deleteChecklistById(id);

    if (!doc) {
      return res.status(404).json({ error: "Checklist not found" });
    }

    return res.status(200).json({ message: "Checklist successfully deleted" });
  } catch (error) {
    console.error("Error deleting checklist:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const editChecklist = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id || !updatedData) {
      return res.status(400).json({ error: "Checklist ID and updated data are required" });
    }

    const updatedChecklist = await editChecklistById(id, updatedData);

    if (!updatedChecklist) {
      return res.status(404).json({ message: "Checklist not found or update failed" });
    }

    return res.json(updatedChecklist);
  } catch (error) {
    console.error("Error updating checklist:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createChecklist = async (req, res) => {
  try {
    const newChecklist = await addChecklist(req.body);
    res.status(201).json(newChecklist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
