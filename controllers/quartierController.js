const Quartier = require("../models/quartier");

// Liste des quartiers
exports.listQuartiers = async (req, res) => {
  try {
    const quartiers = await Quartier.find();
    res.render("quartier/list-quartier", { quartiers });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des quartiers" });
  }
};

// Afficher formulaire de création
exports.showCreateForm = async (req, res) => {
  res.render("quartier/create-quartier");
};

// Créer un quartier
exports.createQuartier = async (req, res) => {
  try {
    const quartier = new Quartier(req.body);
    await quartier.save();
    global.recalculAPI();  // ✅ Utilisation globale
    res.redirect("/quartiers"); // Redirection après création
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du quartier" });
  }
};

// Afficher formulaire d'édition
exports.showEditForm = async (req, res) => {
  try {
    const quartier = await Quartier.findById(req.params.id);
    if (!quartier) {
      return res.status(404).json({ message: "Quartier introuvable" });
    }
    res.render("quartier/edit-quartier", { quartier });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du quartier" });
  }
};

// Mettre à jour un quartier
exports.updateQuartier = async (req, res) => {
  try {
    const quartier = await Quartier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quartier) {
      return res.status(404).json({ message: "Quartier introuvable" });
    }
    global.recalculAPI();  // ✅ Utilisation globale
    res.redirect("/quartiers"); // Redirection après modification
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du quartier" });
  }
};

// Afficher confirmation suppression
exports.showDeleteForm = async (req, res) => {
  try {
    const quartier = await Quartier.findById(req.params.id);
    if (!quartier) {
      return res.status(404).json({ message: "Quartier introuvable" });
    }
    res.render("quartier/delete-quartier", { quartier });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du quartier" });
  }
};

// Supprimer un quartier
exports.deleteQuartier = async (req, res) => {
  try {
    const quartier = await Quartier.findByIdAndDelete(req.params.id);
    if (!quartier) {
      return res.status(404).json({ message: "Quartier introuvable" });
    }
    global.recalculAPI();  // ✅ Utilisation globale
    res.redirect("/quartiers"); // Redirection après suppression
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du quartier" });
  }
};