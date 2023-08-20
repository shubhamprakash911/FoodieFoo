const { FavouriteRecipeModel } = require("../model/favouriteRecipe.model");

async function addFavouriteRecipe(req, res) {
  try {
    const isPresent = await FavouriteRecipeModel.find({
      recipe_id: req.body.recipe_id,
    });

    if (isPresent.length < 1) {
      const recipe = new FavouriteRecipeModel(req.body);
      await recipe.save();
      res
        .status(200)
        .json({ status: true, msg: "Succefully added a recipe", recipe });
    } else {
      res
        .status(409)
        .json({ status: false, msg: "Recipe already marked as favorite." });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Internal Server Error",
    });

    console.log(error.message, "recipeController");
  }
}

async function getFavouriteRecipe(req, res) {
  try {
    const recipeData = await FavouriteRecipeModel.find({
      userId: req.body.userId,
    });
    res
      .status(200)
      .json({ status: true, msg: "Succefully", recipes: recipeData });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Internal Server Error",
    });

    console.log(error.message, "error while getting recipe");
  }
}

async function deleteRecipe(req, res) {
  try {
    const recipeData = await FavouriteRecipeModel.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({
      status: true,
      msg: "Succefully delete a recipe",
      recipes: recipeData,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Internal Server Error",
    });

    console.log(error.message, "error while getting recipe");
  }
}

module.exports = { addFavouriteRecipe, getFavouriteRecipe, deleteRecipe };
