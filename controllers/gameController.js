const db = require("../db/queries");

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

exports.gameCreateGet = (req, res) => {
  res.send("Game creation form");
};

exports.gameCreatePost = (req, res) => {
  res.send("Create game");
};

exports.gameUpdateGet = (req, res) => {
  res.send(`Game update form for ID: ${req.params.id}`);
};

exports.gameUpdatePost = (req, res) => {
  res.send(`Update game with ID: ${req.params.id}`);
};

exports.gameDeletePost = (req, res) => {
  res.send(`Delete game with ID: ${req.params.id}`);
};
