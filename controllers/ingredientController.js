const Ingredient = require("../models/ingredient");

exports.listIngredients = async (req, res) => {
  const ingredients = await Ingredient.find();
  res.render("ingredients/list-ingredients", { ingredients });
};

exports.showCreateForm = (req, res) => {
  res.render("ingredients/create-ingredient");
};

exports.createIngredient = async (req, res) => {
  const { name, prix_unitaire, unite, quantite_reference } = req.body;
  await Ingredient.create({ name, prix_unitaire, unite, quantite_reference });
  res.redirect("/ingredients");
};

exports.showEditForm = async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id);
  res.render("ingredients/edit-ingredient", { ingredient });
};

exports.updateIngredient = async (req, res) => {
  const { name, prix_unitaire, unite, quantite_reference } = req.body;
  await Ingredient.findByIdAndUpdate(
    req.params.id,
    { name, prix_unitaire, unite, quantite_reference }
  );
  global.recalculAPI();  // ✅ Utilisation globale
  res.redirect("/ingredients");
};

exports.deleteIngredient = async (req, res) => {
  await Ingredient.findByIdAndDelete(req.params.id);
  global.recalculAPI();  // ✅ Utilisation globale
  res.redirect("/ingredients");
};
