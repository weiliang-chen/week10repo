var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find().populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    
    getAllgreaterthan: function (req, res) {
        Movie.find({year: {$gte: 1995}}).populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },

    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },

    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },

    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },

    deleteOne: function (req, res) {
        Movie.findOneAndDelete({_id: req.params.id}, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    deleteActorInMovie: function (req, res) {
        Movie.findOneAndUpdate({_id: req.params.Mid}, {"$pull": {"actors": req.params.Aid}},
        function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        })
    },

    addActorInMovie: function (req, res) {
        Actor.findOne({ _id: req.params.Aid }, function(err, actor){
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
        })
        Movie.findOneAndUpdate({_id: req.params.Mid}, {"$push": {"actors": req.params.Aid}},
        function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        })
    },

    getAllBetweenYear: function (req, res) {
        Movie.find({year: {$gte: req.params.year1, $lte: req.params.year2}}, 
        function(err, movies){
            if (err) return res.status(400).json(err);
            if (!movies) return res.status(404).json();
            res.json(movies);
        })
    },

    deleteAllBetweenYear: function (req, res){
        Movie.deleteMany({year: {$gte: req.params.year1, $lte: req.params.year2}},
        function (err, movies){
            if (err) return res.status(400).json(err);
            if (!movies) return res.status(404).json();
            res.json(movies);
            
        })
    }
};