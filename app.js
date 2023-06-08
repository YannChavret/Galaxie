const express = require("express");
const app = express();
const port = 3000;

const fs = require("fs");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Route pour récupérer les données
app.get("/api/dataA", (req, res) => {
  try {
    // Charger les données à partir du fichier JSON 221410_A.json
    const dataA = JSON.parse(fs.readFileSync("221410_A.json", "utf8"));

    res.json(dataA);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors du chargement des données." });
  }
});

app.get("/api/dataB", (req, res) => {
  try {
    // Charger les données à partir du fichier JSON 221410_B.json
    const dataB = JSON.parse(fs.readFileSync("221410_B.json", "utf8"));

    res.json(dataB);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors du chargement des données." });
  }
});

app.get("/api/data", (req, res) => {
  try {
    // Charger les données à partir du fichier JSON 221410_A.json
    const dataA = JSON.parse(fs.readFileSync("221410_A.json", "utf8"));
    // Charger les données à partir du fichier JSON 221410_B.json
    const dataB = JSON.parse(fs.readFileSync("221410_B.json", "utf8"));

    // Fusionner les données si nécessaire
    const mergedData = [...dataA, ...dataB];
    res.json(mergedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors du chargement des données." });
  }
});

// Serveur d'écoute
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
