const mongoose = require("mongoose");

const SoupeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [
    {
      ingredientId: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" },
      quantite: Number
    }
  ],
  prix_net: Number
});

module.exports = mongoose.model("Soupe", SoupeSchema);
