import { db } from "../configuration/firebaseConfig.js";
import { dbTables } from "../configuration/firebaseDb.js";

export const findAllNews = async () => {
  const articlesRef = db.collection(dbTables.NEWS.tableName);
  const snapshot = await articlesRef.get();

  return snapshot.empty
    ? null
    : snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
};

export const findArticleById = async (id) => {
  if (!id) return null;

  const articleDoc = await db.collection(dbTables.NEWS.tableName).doc(id).get();

  return !articleDoc.exists ? null : articleDoc.data();
};

export const editArticleById = async (id, updatedData) => {
  if (!id || !updatedData) return null;

  const articleDoc = db.collection(dbTables.NEWS.tableName).doc(id);
  const article = await articleDoc.get();

  if (!article.exists) {
    return null;
  }

  await articleDoc.update(updatedData);
  return { id, ...updatedData };
};

export const addArticle = async (articleData) => {
  if (!articleData.ownerId || !articleData.title.trim() || !articleData.content.trim()) {
    throw new Error("Owner, title and content are required.");
  }

  const articlesRef = db.collection(dbTables.NEWS.tableName);
  const newArticle = {
    title: articleData.title,
    content: articleData.content,
    uploadDate: new Date().toISOString(),
    updateDate: "",
    ownerId: articleData.ownerId,
    archived: false,
    likes: [],
    comments: [],
  };

  const docRef = await articlesRef.add(newArticle);
  return { id: docRef.id, ...newArticle };
};
