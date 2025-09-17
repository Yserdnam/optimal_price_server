const express = require("express");
const router = express.Router();
const soupeController = require("../controllers/soupeController");

router.get("/", soupeController.listSoupes);
router.get("/create", soupeController.showCreateForm);
router.post("/create", soupeController.createSoupe);
router.get("/edit/:id", soupeController.showEditForm);
router.post("/edit/:id", soupeController.updateSoupe);
// Ajouter edit/update/delete similaires

module.exports = router;
