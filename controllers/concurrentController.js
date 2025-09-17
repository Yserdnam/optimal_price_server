const Concurrent = require('../models/concurrent');
const Soupe = require('../models/soupe');

exports.list = async (req, res) => {
  const concurrents = await Concurrent.find();
  res.render('concurrents/list-concurrents', { concurrents });
};

exports.createForm = (req, res) => {
  res.render('concurrents/create-concurrent');
};

exports.create = async (req, res) => {
  await Concurrent.create(req.body);
  global.recalculAPI();  // ✅ Utilisation globale
  res.redirect('/concurrents');
};

exports.editForm = async (req, res) => {
  const concurrent = await Concurrent.findById(req.params.id);
  const soupes = await Soupe.find(); // Récupère toutes les soupes
  res.render('concurrents/edit-concurrent', { concurrent, soupes });
};

exports.update = async (req, res) => {
  const { nom, lien_FB, lien_GMap, nb_avis, followers, rating, quartier } = req.body;
  // Récupère les prix des soupes depuis le formulaire
  const prix_soupes = [];
  if (req.body.soupe && req.body.prix) {
    // Si plusieurs soupes, req.body.soupe et req.body.prix sont des tableaux
    if (Array.isArray(req.body.soupe)) {
      for (let i = 0; i < req.body.soupe.length; i++) {
        if (req.body.prix[i]) {
          prix_soupes.push({ soupe: req.body.soupe[i], prix: req.body.prix[i] });
        }
      }
    } else if (req.body.prix) {
      prix_soupes.push({ soupe: req.body.soupe, prix: req.body.prix });
    }
  }
  await Concurrent.findByIdAndUpdate(req.params.id, {
    nom, lien_FB, lien_GMap, nb_avis, followers, rating, quartier, prix_soupes
  });

  global.recalculAPI();  // ✅ Utilisation globale
  
  res.redirect('/concurrents');
};

exports.delete = async (req, res) => {
  await Concurrent.findByIdAndDelete(req.params.id);
  global.recalculAPI();  // ✅ Utilisation globale
  res.redirect('/concurrents');
};