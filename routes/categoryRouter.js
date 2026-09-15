const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/", categoryController.categoryList);
categoryRouter.get("/new", categoryController.categoryCreateGet);
categoryRouter.post("/new", categoryController.categoryCreatePost);
categoryRouter.get("/:id", categoryController.categoryDetail);
categoryRouter.get("/:id/edit", categoryController.categoryUpdateGet);
categoryRouter.post("/:id/edit", categoryController.categoryUpdatePost);
categoryRouter.post("/:id/delete", categoryController.categoryDeletePost);

module.exports = categoryRouter;
