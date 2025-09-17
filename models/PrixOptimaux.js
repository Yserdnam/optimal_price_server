const mongoose = require("mongoose");

const PrixOptimauxSchema = new mongoose.Schema({
    soupe: { type: String, required: true },
    quartier: { type: String, required: true },
    prix_net: { type: Number, required: true },
    prix_moyen: { type: Number, required: true },
    prix_optimal: { type: Number, required: true },
    marge_realisee: { type: Number, required: true },
    nb_concurrents: { type: Number, required: true },
    prix_moyen_ajuste: { type: Number },
    influence_score_moyen: { type: Number },
    nb_reviews_moyen: { type: Number },
    followers_moyens: { type: Number },
    rating_moyen: { type: Number },
    created_at: { type: Date, default: Date.now }
}, { collection: 'prix_optimaux' });

module.exports = mongoose.model("PrixOptimaux", PrixOptimauxSchema);