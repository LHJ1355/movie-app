const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post('/favoriteNumber', (req, res) => {
    Favorite.find({"movieId" : req.body.movieId})
    .exec((err, info) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success : true, favoriteNumber : info.length})
    })
})

router.post('/favorited', (req, res) => {
    Favorite.find({"movieId" : req.body.movieId, "userFrom" : req.body.userFrom})
    .exec((err, info) => {
        if(err) return res.status(400).send(err);
        
        let result = false;
        if(info.length !== 0) result = true;
        res.status(200).json({ success : true, result : result})
    })
})

router.post('/deleteFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({"movieId" : req.body.movieId, "userFrom" : req.body.userFrom})
    .exec((err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({success : true, doc})
    })
})

router.post('/addToFavorite', (req, res) => {
    let favorited = new Favorite(req.body)
    favorited.save((err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({success : true, doc});
    })
})

router.post('/getFavoriteMovie', (req, res) => {
    Favorite.find({userFrom : req.body.userFrom})
    .exec((err, info) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success : true, favoriteMovies : info})
    })
})
module.exports = router;