const express = require("express");
const { authanticate } = require("../middleware/authentication.middleware");
const {
  addFavouriteRecipe,
  getFavouriteRecipe,
  deleteRecipe,
} = require("../controllers/favouriteRecipe.controller");
const recipeRoute = express.Router();

recipeRoute.post("/", authanticate, addFavouriteRecipe);
recipeRoute.get("/", authanticate, getFavouriteRecipe);
recipeRoute.delete("/:id", authanticate, deleteRecipe);

module.exports = { recipeRoute };
