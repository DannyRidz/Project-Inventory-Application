const { Router } = require("express");
const gameController = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.get("/", gameController.gameList);
gameRouter.get("/new", gameController.gameCreateGet);
gameRouter.post(
  "/new",
  gameController.validateGame,
  gameController.gameCreatePost,
);
gameRouter.get("/:id", gameController.gameDetail);
gameRouter.get("/:id/edit", gameController.gameUpdateGet);
gameRouter.post(
  "/:id/edit",
  gameController.validateGame,
  gameController.gameUpdatePost,
);
gameRouter.post("/:id/delete", gameController.gameDeletePost);

module.exports = gameRouter;
