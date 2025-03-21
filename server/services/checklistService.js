import { db } from "../configuration/firebaseConfig.js";
import { dbTables } from "../configuration/firebaseDb.js";

export const findAllChecklistsByUser = async (userId) => {
  if (!userId) return null;

  const checklistsRef = db.collection(dbTables.CHECKLISTS.tableName);
  const snapshot = await checklistsRef.where(dbTables.CHECKLISTS.fields.ownerId, "==", userId).get();

  return snapshot.empty
    ? null
    : snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
};

export const findChecklistById = async (id) => {
  if (!id) return null;

  const checklistDoc = await db.collection(dbTables.CHECKLISTS.tableName).doc(id).get();

  return !checklistDoc.exists ? null : checklistDoc.data();
};

export const deleteChecklistById = async (id) => {
  const checklistDoc = db.collection(dbTables.CHECKLISTS.tableName).doc(id);

  const checklist = await checklistDoc.get();

  if (!checklist.exists) {
    return null;
  }

  await checklistDoc.delete();
  return checklist;
};

export const editChecklistById = async (id, updatedData) => {
  if (!id || !updatedData) return null;

  const checklistDoc = db.collection(dbTables.CHECKLISTS.tableName).doc(id);
  const checklist = await checklistDoc.get();

  if (!checklist.exists) {
    return null;
  }

  await checklistDoc.update(updatedData);
  return { id, ...updatedData };
};

export const addChecklist = async (checklistData) => {
  if (!checklistData.ownerId || !checklistData.title || checklistData.elements.length === 0) {
    throw new Error("Owner, title and content are required.");
  }

  const checklistsRef = db.collection(dbTables.CHECKLISTS.tableName);
  const newChecklist = {
    title: checklistData.title || "",
    startDate: new Date().toISOString(),
    completedOn: "",
    dueDate: checklistData.dueDate || "",
    ownerId: checklistData.ownerId,
    trackProgress: "New",
    archived: false,
    elements: checklistData.elements,
    peers: [],
  };

  const docRef = await checklistsRef.add(newChecklist);
  return { id: docRef.id, ...newChecklist };
};
