const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/", categoryController.categoryList);
categoryRouter.get("/new", categoryController.categoryCreateGet);
categoryRouter.post(
  "/new",
  categoryController.validateCategory,
  categoryController.categoryCreatePost,
);
categoryRouter.get("/:id", categoryController.categoryDetail);
categoryRouter.get("/:id/edit", categoryController.categoryUpdateGet);
categoryRouter.post(
  "/:id/edit",
  categoryController.validateCategory,
  categoryController.validateAdminPassword,
  categoryController.categoryUpdatePost,
);
categoryRouter.post(
  "/:id/delete",
  categoryController.validateAdminPassword,
  categoryController.categoryDeletePost,
);

module.exports = categoryRouter;
