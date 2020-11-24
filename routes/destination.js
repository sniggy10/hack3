const express = require('express');
const mongoose = require('mongoose');
const destinationModel = require('../models/destModel');
const router = express.Router();
const parser= require('body-parser');

router.get('/sender', function(req, res) {
    destinationModel.find()
        .exec()
        .then(destinations => {
            res.json(destinations).status(201);
        });
});

router.post('/', function(req, res) {
    const newDestination = new destinationModel({
        username: req.body.username,
        drop: req.body.drop
    });

    newDestination.save();
    console.log("New destination entry");
})

module.exports = router;