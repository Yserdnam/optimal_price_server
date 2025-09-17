const Pricing = require("../models/Pricing");

// Convertir les pourcentages en décimales
function convertPercentagesToDecimals(body) {
  const converted = { ...body };
  
  // Liste des champs qui sont des pourcentages
  const percentageFields = [
    'MARGE_CIBLE',
    'POIDS_CONCURRENTS',
    'POIDS_MARGE',
    'POIDS_QUARTIER',
    'POIDS_INFLUENCE',
    'MIN_MARGIN'
  ];
  
  percentageFields.forEach(field => {
    if (converted[field] !== undefined) {
      // Convertir le pourcentage en décimal (50 → 0.5)
      converted[field] = parseFloat(converted[field]) / 100;
    }
  });
  
  return converted;
}

// Afficher la configuration pricing
exports.showPricing = async (req, res) => {
  try {
    const pricing = await Pricing.getPricing();
    res.render("pricing/edit-pricing", { pricing });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la configuration pricing" });
  }
};

// Mettre à jour la configuration pricing
exports.updatePricing = async (req, res) => {
  try {
    // Convertir les pourcentages en décimales avant sauvegarde
    const convertedData = convertPercentagesToDecimals(req.body);
    
    // Trouver et mettre à jour le seul document
    const pricing = await Pricing.findOneAndUpdate({}, convertedData, { 
      new: true,
      upsert: true
    });
    global.recalculAPI();  // ✅ Utilisation globale
    res.redirect("/pricing");
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la configuration pricing" });
  }
};

// Réinitialiser aux valeurs par défaut
exports.resetPricing = async (req, res) => {
  try {
    await Pricing.findOneAndDelete({});
    const pricing = await Pricing.create({});
    global.recalculAPI();  // ✅ Utilisation globale
    res.redirect("/pricing");
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la réinitialisation" });
  }
};