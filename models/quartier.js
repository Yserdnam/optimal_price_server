const mongoose = require("mongoose");

const QuartierSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  poids: { type: Number, required: true }
});

module.exports = mongoose.model("Quartier", QuartierSchema);
