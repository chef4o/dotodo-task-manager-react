import { findAllNotesByUser, findNoteById, deleteNoteById, editNoteById, addNote } from "../services/noteService.js";

export const getAllNotesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const notes = await findAllNotesByUser(userId);

    if (!notes) {
      return res.status(404).json({ message: "No notes found" });
    }

    return res.json(notes);
  } catch (error) {
    console.error("Error fetching notes from Firestore:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Note ID is required" });
    }

    const note = await findNoteById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.json(note);
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Note ID is required" });
    }

    const doc = await deleteNoteById(id);

    if (!doc) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json({ message: "Note successfully deleted" });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const editNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id || !updatedData) {
      return res.status(400).json({ error: "Note ID and updated data are required" });
    }

    const updatedNote = await editNoteById(id, updatedData);

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found or update failed" });
    }

    return res.json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createNote = async (req, res) => {
  try {
    if (!req.body.ownerId || !req.body.title || !req.body.content) {
      return res.status(400).json({ error: "Owner ID, title, and content are required." });
    }

    const newNote = await addNote(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
