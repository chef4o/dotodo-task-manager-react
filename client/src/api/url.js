const baseUrl = "http://localhost:5000";

const users = `${baseUrl}/users`;
const editUser = `${users}/edit`; 
const userByEmail = `${users}/email`;
const userByUsername = `${users}/username`;

const register = `${baseUrl}/auth/register`;
const validateIfExists = `${baseUrl}/auth/validate-existing-user`;
const customToken = `${baseUrl}/auth/custom-token`;

const notes = `${baseUrl}/notes`;
const deleteNote = `${notes}/delete`;
const editNote = `${notes}/edit`;
const addNote = `${notes}/add`;

const checklists = `${baseUrl}/checklists`;
const deleteChecklist = `${checklists}/delete`;
const editChecklist = `${checklists}/edit`;
const addChecklist = `${checklists}/add`;

const news = `${baseUrl}/news`;
const editArticle = `${news}/edit`;
const addArticle = `${news}/add`;

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
  news, 
  editArticle, 
  addArticle,
  sendSupportMessage
};
