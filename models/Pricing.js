const mongoose = require("mongoose");

const PricingSchema = new mongoose.Schema({
  MARGE_CIBLE: { type: Number, required: true, default: 0.3 },
  POIDS_CONCURRENTS: { type: Number, required: true, default: 0.4 },
  POIDS_MARGE: { type: Number, required: true, default: 0.3 },
  POIDS_QUARTIER: { type: Number, required: true, default: 0.2 },
  POIDS_INFLUENCE: { type: Number, required: true, default: 0.1 },
  MIN_MARGIN: { type: Number, required: true, default: 0.1 }
}, { collection: 'pricing' });

// S'assurer qu'il n'y a qu'un seul document
PricingSchema.statics.getPricing = function() {
  return this.findOne().then(pricing => {
    if (!pricing) {
      // Créer la configuration par défaut si elle n'existe pas
      return this.create({});
    }
    return pricing;
  });
};

module.exports = mongoose.model("Pricing", PricingSchema);