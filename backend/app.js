const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');
const app = express();

mongoose.connect('mongodb+srv://jeff007:tczJd3dArrDW3XGM@cluster0-shtxy.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());

app.post('/api/recipes', (req, res, next) => {
    const recipe = new Recipe({
        recipeName: req.body.recipeName,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        recipeIngredients: req.body.recipeIngredients,
        recipeInstructions: req.body.recipeInstructions
    });
    recipe.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
app.use((req, res) => {
    res.json({ message: 'Your request was successful!' });
});
app.get('/api/recipes/:id', (req, res, next) => {
    Recipe.findOne({
      _id: req.params.id
    }).then(
      (recipe) => {
        res.status(200).json(recipe);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  });
app.use('/api/recipes', (req, res, next) => {
    Recipe.find().then(
      (recipe) => {
        res.status(200).json(recipes);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
  
module.exports = app;