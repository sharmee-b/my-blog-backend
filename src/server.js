import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/myBlogRoutes";
import mongoose from "mongoose";
import path from path;

const app = express();
const PORT = "8000";

app.use(express.static(path.join(__dirname, "/build")));
app.use(bodyParser.json());
routes(app);

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
})
app.listen(PORT, () => console.log(`my-blog running on ${PORT}`));
