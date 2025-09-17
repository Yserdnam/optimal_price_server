// utils/recalculAPI.js
const axios = require("axios");
const { RECALCUL_API_URL } = require("../config/apiConfig");

async function recalculAPI() {
  try {
    console.log(`🔄 Appel de l'API recalcul: ${RECALCUL_API_URL}`);
    const response = await axios.get(RECALCUL_API_URL);
    console.log("✅ Recalcul terminé:", response.data);
  } catch (error) {
    console.error("❌ Erreur API recalcul:", error.message);
  }
}

module.exports = recalculAPI;
