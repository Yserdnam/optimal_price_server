const PrixOptimaux = require("../models/prixOptimaux");
const Concurrent = require("../models/concurrent");
const Pricing = require("../models/pricing"); 

exports.showDashboard = async (req, res) => {
    try {
        const prixOptimaux = await PrixOptimaux.find({}).sort({ soupe: 1, quartier: 1 });
        const totalConcurrents = await Concurrent.countDocuments();
        const pricing = await Pricing.getPricing(); 

        const stats = {
            total_observations: prixOptimaux.length,
            total_soupes: new Set(prixOptimaux.map(item => item.soupe)).size,
            total_quartiers: new Set(prixOptimaux.map(item => item.quartier)).size,
            marge_moyenne: (prixOptimaux.reduce((sum, item) => sum + item.marge_realisee, 0) / prixOptimaux.length).toFixed(1),
            prix_optimal_moyen: (prixOptimaux.reduce((sum, item) => sum + item.prix_optimal, 0) / prixOptimaux.length).toFixed(0),
            total_concurrents: totalConcurrents
        };
        res.render('dashboard', {
            prix_optimaux: prixOptimaux,
            stats: stats,
            pricing: pricing
        });

    } catch (error) {
        console.error("Erreur dashboard:", error);
        res.status(500).render('error', { message: "Erreur dashboard" });
    }
};

// API pour les données JSON (utile pour les graphiques)
exports.getDashboardData = async (req, res) => {
    try {
        const prixOptimaux = await PrixOptimaux.find({}).sort({ soupe: 1, quartier: 1 });
        res.json(prixOptimaux);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des données" });
    }
};