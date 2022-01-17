const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "", //ajout info
  host: "", //ajout info
  password: "", //ajout info
  database: "", //ajout info
});

//creation des requettes

//Ajout dans bddRecette
app.post("/create", (req, res) => {
  const titre = req.body.titre;
  const sousTitre = req.body.sousTitre;
  const ingredients = req.body.ingredients;

  db.query(
    "INSERT INTO recette (titre, sousTitre, ingredients) VALUES (?,?,?)",
    [titre, sousTitre, ingredients],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

//affichage des recettes
app.get("/recettes", (req, res) => {
  db.query("SELECT * FROM recette", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//update des recettes
app.put("/update", (req, res) => {
  const idRecette = req.body.idRecette;
  const titre = req.body.titre;
  const sousTitre = req.body.sousTitre;
  const ingredients = req.body.ingredients;

  db.query(
    "UPDATE recette SET titre = ? WHERE idRecette = ?",
    [titre, idRecette],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );

  db.query(
    "UPDATE recette SET sousTitre = ? WHERE idRecette = ?",
    [sousTitre, idRecette],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );

  db.query(
    "UPDATE recette SET ingredients = ? WHERE idRecette = ?",
    [ingredients, idRecette],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//delete des recettes
app.delete("/delete/:idRecette", (req, res) => {
  const idRecette = req.params.idRecette;
  db.query(
    "DELETE FROM recette WHERE idRecette = ?",
    idRecette,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
