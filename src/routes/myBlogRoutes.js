import {
  getArticleByName,
  upvoteArticle,
  addCommentToArticle,
  getAllArticles,
} from "../controllers/myBlogController";

const articlesInfo = {
  react: {
    upvotes: 1,
    comments: [],
  },
  java: {
    upvotes: 2,
  },
  javascript: {
    upvotes: 3,
  },
};

const routes = (app) => {
  app.get("/api/articles", getAllArticles);
  app.get("/api/articles/:name", getArticleByName);
  app.post("/api/articles/:name/upvote", upvoteArticle);
  app.post("/api/articles/:name/add-comment", addCommentToArticle);
};

export default routes;
