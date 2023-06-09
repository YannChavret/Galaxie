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

    // Fonction pour calculer les variations entre les positions 0 et 7, 1 et 8, etc.
    function calculateVariations(data) {
      const newData = [];

      for (let i = 0; i < data.length - 7; i++) {
        const rowA = data[i];
        const rowB = data[i + 7];

        if (rowA && rowB) {
          const newRow = {};

          for (const key in rowA) {
            if (rowA.hasOwnProperty(key) && rowB.hasOwnProperty(key)) {
              const valueA = rowA[key];
              const valueB = rowB[key];

              if (key === "Rank" || key === "Redshift") {
                newRow[key] = valueA;
              } else if (
                typeof valueA === "number" &&
                typeof valueB === "number"
              ) {
                const variation = ((valueB - valueA) / valueA) * 100;
                newRow[key] = variation;
              } else if (
                typeof valueA === "string" &&
                typeof valueB === "string"
              ) {
                newRow[key] = valueA;
              } else {
                newRow[key] = null;
              }
            }
          }

          newData.push(newRow);
        }
      }

      return newData;
    }

    // Calculer les variations pour les données fusionnées
    const dataWithVariations = calculateVariations(mergedData);

    res.json(dataWithVariations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors du chargement des données." });
  }
});

// Serveur d'écoute
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
