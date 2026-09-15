const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

exports.validateGame = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must contain between 1 and 200 characters."),

  body("description")
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must contain no more than 1000 characters."),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be zero or greater."),

  body("stock_quantity")
    .isInt({ min: 0 })
    .withMessage("Stock quantity must be a whole number of zero or greater."),

  body("category_id").isInt({ min: 1 }).withMessage("Select a category."),
];

exports.gameList = async (req, res) => {
  const games = await db.getAllGames();

  res.render("games/index", {
    title: "Games",
    games,
  });
};

exports.gameDetail = async (req, res) => {
  const game = await db.getGameById(req.params.id);

  if (!game) {
    return res.status(404).send("Game not found");
  }

  res.render("games/detail", {
    title: game.title,
    game,
  });
};

exports.gameCreateGet = async (req, res) => {
  const categories = await db.getAllCategories();

  res.render("games/form", {
    title: "Create game",
    game: {
      title: "",
      description: "",
      price: "",
      stock_quantity: 0,
      category_id: "",
    },
    categories,
    errors: [],
    action: "/games/new",
    submitLabel: "Create game",
  });
};

exports.gameCreatePost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const categories = await db.getAllCategories();

    return res.status(400).render("games/form", {
      title: "Create game",
      game: req.body,
      categories,
      errors: errors.array(),
      action: "/games/new",
      submitLabel: "Create game",
    });
  }

  const category = await db.getCategoryById(req.body.category_id);

  if (!category) {
    const categories = await db.getAllCategories();

    return res.status(400).render("games/form", {
      title: "Create game",
      game: req.body,
      categories,
      errors: [{ msg: "The selected category does not exist." }],
      action: "/games/new",
      submitLabel: "Create game",
    });
  }

  const game = await db.createGame(
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.stock_quantity,
    req.body.category_id,
  );

  res.redirect(`/games/${game.id}`);
};

exports.gameUpdateGet = async (req, res) => {
  const [game, categories] = await Promise.all([
    db.getGameById(req.params.id),
    db.getAllCategories(),
  ]);

  if (!game) {
    return res.status(404).send("Game not found");
  }

  res.render("games/form", {
    title: "Edit game",
    game,
    categories,
    errors: [],
    action: `/games/${game.id}/edit`,
    submitLabel: "Save changes",
  });
};

exports.gameUpdatePost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const categories = await db.getAllCategories();

    return res.status(400).render("games/form", {
      title: "Edit game",
      game: {
        id: req.params.id,
        ...req.body,
      },
      categories,
      errors: errors.array(),
      action: `/games/${req.params.id}/edit`,
      submitLabel: "Save changes",
    });
  }

  const category = await db.getCategoryById(req.body.category_id);

  if (!category) {
    const categories = await db.getAllCategories();

    return res.status(400).render("games/form", {
      title: "Edit game",
      game: {
        id: req.params.id,
        ...req.body,
      },
      categories,
      errors: [{ msg: "The selected category does not exist." }],
      action: `/games/${req.params.id}/edit`,
      submitLabel: "Save changes",
    });
  }

  const game = await db.updateGame(
    req.params.id,
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.stock_quantity,
    req.body.category_id,
  );

  if (!game) {
    return res.status(404).send("Game not found");
  }

  res.redirect(`/games/${game.id}`);
};

exports.gameDeletePost = (req, res) => {
  res.send(`Delete game with ID: ${req.params.id}`);
};
