const express = require("express");
const router = express.Router();
const quartierController = require("../controllers/quartierController");

router.get("/", quartierController.listQuartiers);
router.get("/create", quartierController.showCreateForm);
router.post("/create", quartierController.createQuartier);
router.get("/edit/:id", quartierController.showEditForm);
router.post("/edit/:id", quartierController.updateQuartier); // POST pour le form
router.get("/delete/:id", quartierController.showDeleteForm);
router.post("/delete/:id", quartierController.deleteQuartier); // POST pour le form

module.exports = router;