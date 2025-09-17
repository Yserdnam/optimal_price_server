const Soupe = require("../models/soupe");
const Ingredient = require("../models/ingredient");

exports.listSoupes = async (req, res) => {
  const soupes = await Soupe.find();
  res.render("soupes/list-soupes", { soupes });
};

exports.showCreateForm = async (req, res) => {
  const ingredients = await Ingredient.find();
  res.render("soupes/create-soupe", { ingredients });
};

exports.createSoupe = async (req, res) => {
  const { soupe_name, ...quantites } = req.body;
  let selectedIngredients = [];
  let prix_net = 0;

  for (let key in quantites) {
    if (quantites[key] && parseFloat(quantites[key]) > 0) {
      let ingredientId = key.replace("quantite_", "");
      let ingredient = await Ingredient.findById(ingredientId);
      let quantite = parseFloat(quantites[key]);

      // Conversion selon l'unité de référence de l'ingrédient
      let prix_ingredient = 0;
      if (ingredient.unite === "g" || ingredient.unite === "ml") {
        // prix_unitaire pour quantite_reference (ex: 180g), donc proportionnel
        prix_ingredient = (quantite / ingredient.quantite_reference) * ingredient.prix_unitaire;
      } else {
        // unite, kg, L : prix_unitaire pour quantite_reference (ex: 1kg, 1L, 1unite)
        prix_ingredient = (quantite / ingredient.quantite_reference) * ingredient.prix_unitaire;
      }
      prix_net += prix_ingredient;

      selectedIngredients.push({ ingredientId, quantite });
    }
  }

  await Soupe.create({ name: soupe_name, ingredients: selectedIngredients, prix_net });
  global.recalculAPI();  // ✅ Utilisation globale
  res.redirect("/soupes");
};

exports.showEditForm = async (req, res) => {
  const soupe = await Soupe.findById(req.params.id);
  const ingredients = await Ingredient.find();
  res.render("soupes/edit-soupe", { soupe, ingredients });
};

exports.updateSoupe = async (req, res) => {
  const { soupe_name, ...quantites } = req.body;
  let selectedIngredients = [];
  let prix_net = 0;

  for (let key in quantites) {
    if (quantites[key] && parseFloat(quantites[key]) > 0) {
      let ingredientId = key.replace("quantite_", "");
      let ingredient = await Ingredient.findById(ingredientId);
      let quantite = parseFloat(quantites[key]);

      // Conversion selon l'unité de référence de l'ingrédient
      let prix_ingredient = 0;
      if (ingredient.unite === "g" || ingredient.unite === "ml") {
        prix_ingredient = (quantite / ingredient.quantite_reference) * ingredient.prix_unitaire;
      } else {
        prix_ingredient = (quantite / ingredient.quantite_reference) * ingredient.prix_unitaire;
      }
      prix_net += prix_ingredient;

      selectedIngredients.push({ ingredientId, quantite });
    }
  }

  await Soupe.findByIdAndUpdate(req.params.id, {
    name: soupe_name,
    ingredients: selectedIngredients,
    prix_net
  });
  
  global.recalculAPI();  // ✅ Utilisation globale
  res.redirect("/soupes");
};

// Routes edit/update/delete sont similaires
