const express = require("express");
const router = express.Router();
const pricingController = require("../controllers/pricingController");

// Une seule route pour afficher/modifier
router.get("/", pricingController.showPricing);
router.post("/update", pricingController.updatePricing);
router.post("/reset", pricingController.resetPricing);

module.exports = router;