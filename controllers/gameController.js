exports.gameList = (req, res) => {
  res.send("List of games");
};

exports.gameDetail = (req, res) => {
  res.send(`Game details for ID: ${req.params.id}`);
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
