import { MongoClient } from "mongodb";

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
    });
    const db = client.db("my-blog");
    await operations(db);
    client.close();
  } catch (err) {
    res.status(500).send(`ERROR:${err}`);
  }
};

export const getAllArticles = async (req, res) => {
  withDB(async (db) => {
    const articleInfo = await db.collection("articles").find({});
    res.status(200).json(articleInfo);
  }, res);
};

export const getArticleByName = async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(articleInfo);
  }, res);
};

export const upvoteArticle = async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          upvotes: articleInfo.upvotes + 1,
        },
      }
    );
    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(updatedArticleInfo);
  }, res);
};

export const addCommentToArticle = async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const { username, text } = req.body;
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({ username, text }),
        },
      }
    );
    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(updatedArticleInfo);
  }, res);
};
