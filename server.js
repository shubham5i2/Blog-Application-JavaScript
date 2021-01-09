const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const Article = require("./models/article.model");
const methodOverride = require("method-override");

const app = express();

//Database connectivity start
mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection
  .once("open", () => console.log("Connected to database"))
  .on("error", (error) => {
    console.log("Error in connecting", error);
  });
//Database connectivity end

//Setting up view engine as EJS
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false })); //telling express to access form data when POST request is sent
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  let articles = await Article.find().sort({
    createdAt: "desc",
  });
  
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

//Server connection
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
