const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');

// get a list of new movies
router.get('/home', function(req,res, next){
  Movie.find({}).then((movies) => res.send(movies));
});

// get watchlist
router.get('/watchlist', function(req, res, next){
  Movie.find({wished: true}).then((movies) => res.send(movies))
});

// get watched
router.get('/watched', function(req, res, next){
  Movie.find({watched: true}).then((movies) => res.send(movies))
});

// put a movie in the watchlist
router.post('/home', function(req,res, next){
  Movie.create(req.body).then((movie) => {
    res.send(movie);
  }).catch(next);
});

// update a movie
router.put('/home/:id', function(req,res,next){
  Movie.findByIdAndUpdate({_id: req.params.id}, req.body).then((movie) => {
    Movie.findOne({_id: req.params.id}).then((movie) => res.send(movie));
  });
});

router.put('/watchlist/:id', (req, res, next) => {
  Movie.findByIdAndUpdate({_id: req.params.id}, req.body).then((movie) => {
    Movie.findOne({_id: req.params.id}).then((movie) => res.send(movie))
  })
})

router.put('watched/:id')

// delete a movie from the watchlist
router.delete('/home/:id', function(req,res,next){
  Movie.findByIdAndRemove({_id: req.params.id}).then((movie) => {
    res.send(movie);
  });
});

module.exports = router;
