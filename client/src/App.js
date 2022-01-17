import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [titre, setTitre] = useState("");
  const [sousTitre, setSousTitre] = useState("");
  const [ingredients, setIngredients] = useState("");

  const [recetteList, setRecetteList] = useState([]);

  const [newTitre, setNewTitre] = useState("");
  const [newSousTitre, setNewSousTitre] = useState("");
  const [newIngredients, setNewIngredients] = useState("");

  const addRecette = () => {
    Axios.post("http://localhost:3001/create", {
      titre: titre,
      sousTitre: sousTitre,
      ingredients: ingredients,
    }).then(() => {
      //sans rafraîchir
      setRecetteList([
        ...recetteList,
        {
          titre: titre,
          sousTitre: sousTitre,
          ingredients: ingredients,
        },
      ]);
    });
  };

  //recuperation des recettes
  const getRecettes = () => {
    Axios.get("http://localhost:3001/recettes").then((response) => {
      setRecetteList(response.data);
    });
  };

  //update titre recette
  const updateTitre = (idRecette) => {
    Axios.put("http://localhost:3001/update", {
      titre: newTitre,
      idRecette: idRecette,
    }).then((response) => {
      setRecetteList(
        recetteList.map((val) => {
          return val.idRecette == idRecette
            ? {
                idRecette: val.idRecette,
                titre: newTitre,
                sousTitre: val.sousTitre,
                ingredients: val.ingredients,
              }
            : val;
        })
      );
    });
  };
  const updateSousTitre = (idRecette) => {
    Axios.put("http://localhost:3001/update", {
      sousTitre: newSousTitre,
      idRecette: idRecette,
    }).then((response) => {
      setRecetteList(
        recetteList.map((val) => {
          return val.idRecette == idRecette
            ? {
                idRecette: val.idRecette,
                titre: val.titre,
                sousTitre: newSousTitre,
                ingredients: val.ingredients,
              }
            : val;
        })
      );
    });
  };
  const updateIngredients = (idRecette) => {
    Axios.put("http://localhost:3001/update", {
      ingredients: newIngredients,
      idRecette: idRecette,
    }).then((response) => {
      setRecetteList(
        recetteList.map((val) => {
          return val.idRecette == idRecette
            ? {
                idRecette: val.idRecette,
                titre: val.titre,
                sousTitre: val.sousTitre,
                ingredients: newIngredients,
              }
            : val;
        })
      );
    });
  };
  //suppression d'une recette
  const deleteRecette = (idRecette) => {
    Axios.delete(`http://localhost:3001/delete/${idRecette}`).then(
      (response) => {
        setRecetteList(
          recetteList.filter((val) => {
            return val.idRecette != idRecette;
          })
        );
      }
    );
  };

  return (
    <div className="App">
      <div className="container">
        {/* formulaire d'ajout */}
        <div className="form-container">
          <div className="recette">
            <h2>Ajoutez une recette!</h2>
            <form>
              <label>Nom de la recette :</label>
              <input
                type="text"
                onChange={(event) => {
                  setTitre(event.target.value);
                }}
              />
              <label>Sous-Titre :</label>
              <input
                type="text"
                onChange={(event) => {
                  setSousTitre(event.target.value);
                }}
              />
              <label>Ingrédients :</label>
              <textarea
                onChange={(event) => {
                  setIngredients(event.target.value);
                }}
              />
              <button onClick={addRecette}>Ajouter</button>
            </form>
          </div>
        </div>

        {/* affichage et modifications des recettes */}
        <div className="infosContainer">
          <button onClick={getRecettes} className="voirRecettes">
            voir les recettes
          </button>

          {recetteList.map((val, key) => {
            return (
              <div className="recette">
                <div className="recettecontainer">
                  <div className="infos">
                    <h3>{val.titre} :</h3>
                    <h5>plat {val.sousTitre}.</h5>
                    <h3 className="infosIngredients">
                      Ingrédients : <br />
                      {val.ingredients}
                    </h3>
                  </div>
                </div>

                <div className="modif">
                  <input
                    type="text"
                    placeholder="nouveau titre"
                    onChange={(event) => {
                      setNewTitre(event.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      updateTitre(val.idRecette);
                    }}
                  >
                    Modifier le titre
                  </button>

                  <input
                    type="text"
                    placeholder="nouveau Sous titre"
                    onChange={(event) => {
                      setNewSousTitre(event.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      updateSousTitre(val.idRecette);
                    }}
                  >
                    Modifier le sous titre
                  </button>

                  <textarea
                    placeholder="modifier les ingrédients"
                    onChange={(event) => {
                      setNewIngredients(event.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      updateIngredients(val.idRecette);
                    }}
                  >
                    Modifier les ingrédients
                  </button>

                  <button
                    onClick={() => {
                      deleteRecette(val.idRecette);
                    }}
                  >
                    {" "}
                    Supprimer{" "}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
