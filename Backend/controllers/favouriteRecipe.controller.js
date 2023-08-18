const { FavouriteRecipeModel } = require("../model/favouriteRecipe.model");

async function FavouriteRecipe(req, res) {
  try {
    const recipe = new FavouriteRecipeModel(req.body);
    await recipe.save();
    res.status(200).json({ status: 200, msg: "Succefully added a recipe" });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Internal Server Error",
    });
  }
}

module.exports = { FavouriteRecipe };
