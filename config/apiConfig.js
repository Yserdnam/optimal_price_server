require("dotenv").config();

module.exports = {
  RECALCUL_API_URL: process.env.RECALCUL_API_URL || "https://optimal-price-api.onrender.com/recalcul"
};
