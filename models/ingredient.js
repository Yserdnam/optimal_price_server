const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prix_unitaire: { type: Number, required: true },
  unite: { type: String, enum: ["unite","kg", "g", "L", "ml"], required: true },
  quantite_reference: { type: Number, required: true } // quantité pour le prix indiqué
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
