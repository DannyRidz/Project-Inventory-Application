const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const validateAdminPassword = require("../middleware/validateAdminPassword");

exports.validateAdminPassword = validateAdminPassword;

exports.validateCategory = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Name must contain between 1 and 100 characters."),

  body("description")
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must contain no more than 1000 characters."),
];

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
    deleteError: null,
  });
};

exports.categoryCreateGet = (req, res) => {
  res.render("categories/form", {
    title: "Create category",
    category: {
      name: "",
      description: "",
    },
    errors: [],
    action: "/categories/new",
    submitLabel: "Create category",
    requiresAdmin: false,
  });
};

exports.categoryCreatePost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("categories/form", {
      title: "Create category",
      category: req.body,
      errors: errors.array(),
      action: "/categories/new",
      submitLabel: "Create category",
      requiresAdmin: false,
    });
  }

  try {
    const category = await db.createCategory(
      req.body.name,
      req.body.description,
    );

    res.redirect(`/categories/${category.id}`);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).render("categories/form", {
        title: "Create category",
        category: req.body,
        errors: [{ msg: "A category with that name already exists." }],
        action: "/categories/new",
        submitLabel: "Create category",
        requiresAdmin: false,
      });
    }

    throw error;
  }
};

exports.categoryUpdateGet = async (req, res) => {
  const category = await db.getCategoryById(req.params.id);

  if (!category) {
    return res.status(404).send("Category not found");
  }

  res.render("categories/form", {
    title: "Edit category",
    category,
    errors: [],
    action: `/categories/${category.id}/edit`,
    submitLabel: "Save changes",
    requiresAdmin: true,
  });
};

exports.categoryUpdatePost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("categories/form", {
      title: "Edit category",
      category: {
        id: req.params.id,
        ...req.body,
      },
      errors: errors.array(),
      action: `/categories/${req.params.id}/edit`,
      submitLabel: "Save changes",
      requiresAdmin: true,
    });
  }

  try {
    const category = await db.updateCategory(
      req.params.id,
      req.body.name,
      req.body.description,
    );

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.redirect(`/categories/${category.id}`);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).render("categories/form", {
        title: "Edit category",
        category: {
          id: req.params.id,
          ...req.body,
        },
        errors: [{ msg: "A category with that name already exists." }],
        action: `/categories/${req.params.id}/edit`,
        submitLabel: "Save changes",
        requiresAdmin: true,
      });
    }

    throw error;
  }
};

exports.categoryDeletePost = async (req, res) => {
  const categoryId = req.params.id;

  const [category, games] = await Promise.all([
    db.getCategoryById(categoryId),
    db.getGamesByCategoryId(categoryId),
  ]);

  if (!category) {
    return res.status(404).send("Category not found");
  }

  const passwordErrors = validationResult(req);

  if (!passwordErrors.isEmpty()) {
    return res.status(403).render("categories/detail", {
      title: category.name,
      category,
      games,
      deleteError: passwordErrors.array()[0].msg,
    });
  }

  if (games.length > 0) {
    return res.status(409).render("categories/detail", {
      title: category.name,
      category,
      games,
      deleteError: "This category cannot be deleted while it contains games.",
    });
  }

  await db.deleteCategory(categoryId);
  res.redirect("/categories");
};
