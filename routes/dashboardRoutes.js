const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/", dashboardController.showDashboard);
router.get("/api/data", dashboardController.getDashboardData); // API pour les données

module.exports = router;