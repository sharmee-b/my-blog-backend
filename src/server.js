import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/myBlogRoutes";
import mongoose from "mongoose";

const app = express();
const PORT = "8000";

app.use(bodyParser.json());
routes(app);
app.listen(PORT, () => console.log(`my-blog running on ${PORT}`));
