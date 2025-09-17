const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./config/db");

const ingredientRoutes = require("./routes/ingredientRoutes");
const soupeRoutes = require("./routes/soupeRoutes");
const concurrentRoutes = require('./routes/concurrentRoutes');
const quartierRoutes = require("./routes/quartierRoutes");
const pricingRoutes = require('./routes/pricingRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const recalculAPI = require("./utils/recalculAPI"); // ✅ Import de la fonction

const app = express();
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/ingredients", ingredientRoutes);
app.use("/soupes", soupeRoutes);
app.use('/concurrents', concurrentRoutes);
app.use("/quartiers", quartierRoutes);
app.use('/pricing', pricingRoutes);
app.use('/dashboard', dashboardRoutes);

// ✅ Rendre la fonction disponible globalement
global.recalculAPI = recalculAPI;

app.get("/", (req, res) => res.redirect("/dashboard"));

// Dans app.js ou helpers.js
app.locals.formatK = function(prix) {
  if (prix >= 1000000) {
    return (prix / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (prix >= 1000) {
    return (prix / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return prix;
};

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
