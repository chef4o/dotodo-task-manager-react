import { addArticle, editArticleById, findAllNews, findArticleById } from "../services/newsService.js";

export const getAllNews = async (req, res) => {
  try {
    const articles = await findAllNews();

    if (!articles) {
      return res.status(404).json({ message: "No articles found" });
    }

    return res.json(articles);
  } catch (error) {
    console.error("Error fetching articles from Firestore:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getArticle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Article ID is required" });
    }

    const article = await findArticleById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    return res.json(article);
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const editArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id || !updatedData) {
      return res.status(400).json({ error: "Article ID and updated data are required" });
    }

    const updatedArticle = await editArticleById(id, updatedData);

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found or update failed" });
    }

    return res.json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createArticle = async (req, res) => {
  try {
    if (!req.body.ownerId || !req.body.title || !req.body.content) {
      return res.status(400).json({ error: "Owner ID, title, and content are required." });
    }

    const newArticle = await addArticle(req.body);
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
