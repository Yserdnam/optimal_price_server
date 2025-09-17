const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredientController");

router.get("/", ingredientController.listIngredients);
router.get("/create", ingredientController.showCreateForm);
router.post("/create", ingredientController.createIngredient);
router.get("/edit/:id", ingredientController.showEditForm);
router.post("/edit/:id", ingredientController.updateIngredient);
router.get("/delete/:id", ingredientController.deleteIngredient);

module.exports = router;
