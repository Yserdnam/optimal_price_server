const mongoose = require('mongoose');

const ConcurrentSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  lien_FB: { type: String },
  lien_GMap: { type: String },
  nb_avis: { type: Number },
  followers: { type: Number },
  rating: { type: Number },
  quartier: { type: String, required: true },
  prix_soupes: [{
    soupe: { type: String, required: true },
    prix: { type: Number, required: true }
  }]
});

module.exports = mongoose.model('Concurrent', ConcurrentSchema);
