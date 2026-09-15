require("dotenv").config();

const express = require("express");
const path = require("node:path");
const categoryRouter = require("./routes/categoryRouter");
const gameRouter = require("./routes/gameRouter");
const indexController = require("./controllers/indexController");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/categories", categoryRouter);
app.use("/games", gameRouter);

app.get("/", indexController.index);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
