const mongoose = require("mongoose");

const FavouriteRecipeSchema = mongoose.Schema({
  recipe_id: Number,
  title: String,
  image: String,
});

const FavouriteRecipeModel = mongoose.model(
  "FavouriteRecipe",
  FavouriteRecipeSchema
);

module.exports = { FavouriteRecipeModel };
