const baseUrl = "http://localhost:5000";

const users = `${baseUrl}/users`;
const editUser = `${baseUrl}/users/edit`; 
const userByEmail = `${baseUrl}/users/email`;
const userByUsername = `${baseUrl}/users/username`;
const register = `${baseUrl}/auth/register`;
const validateIfExists = `${baseUrl}/auth/validate-existing-user`;
const customToken = `${baseUrl}/auth/custom-token`;

const notes = `${baseUrl}/notes`;
const deleteNote = `${baseUrl}/notes/delete`;
const editNote = `${baseUrl}/notes/edit`;
const addNote = `${baseUrl}/notes/add`;

const checklists = `${baseUrl}/checklists`;
const deleteChecklist = `${baseUrl}/checklists/delete`;
const editChecklist = `${baseUrl}/checklists/edit`;
const addChecklist = `${baseUrl}/checklists/add`;

const sendSupportMessage = `${baseUrl}/contact-us/send`;

export const url = {
  users,
  editUser,
  userByEmail,
  userByUsername,
  register,
  validateIfExists,
  customToken,
  notes,
  deleteNote,
  editNote,
  addNote,
  checklists,
  deleteChecklist,
  editChecklist,
  addChecklist,
  sendSupportMessage
};
