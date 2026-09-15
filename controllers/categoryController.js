const db = require("../db/queries");

exports.categoryList = async (req, res) => {
  const categories = await db.getAllCategories();

  res.render("categories/index", {
    title: "Categories",
    categories,
  });
};

exports.categoryDetail = async (req, res) => {
  const categoryId = req.params.id;

  const [category, games] = await Promise.all([
    db.getCategoryById(categoryId),
    db.getGamesByCategoryId(categoryId),
  ]);

  if (!category) {
    return res.status(404).send("Category not found");
  }

  res.render("categories/detail", {
    title: category.name,
    category,
    games,
  });
};

exports.categoryCreateGet = (req, res) => {
  res.send("Category creation form");
};

exports.categoryCreatePost = (req, res) => {
  res.send("Create category");
};

exports.categoryUpdateGet = (req, res) => {
  res.send(`Category update form for ID: ${req.params.id}`);
};

exports.categoryUpdatePost = (req, res) => {
  res.send(`Update category with ID: ${req.params.id}`);
};

exports.categoryDeletePost = (req, res) => {
  res.send(`Delete category with ID: ${req.params.id}`);
};
