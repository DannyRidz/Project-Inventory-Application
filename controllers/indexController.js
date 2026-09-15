const db = require("../db/queries");

exports.index = async (req, res) => {
  const categories = await db.getAllCategories();

  res.render("index", {
    title: "Video Game Inventory",
    categories,
  });
};
