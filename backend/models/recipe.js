const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  recipeName: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  prepTime:{type: String, required: true },
  cookTime: { type: String, required: true },
  recipeIngredients: { type: String, required: true },
  recipeInstructions: { type: String, required: true },
});

module.exports = mongoose.model('Recipe', recipeSchema);