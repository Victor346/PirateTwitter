var express = require('express');
var router = express.Router();
var redis = require('redis'), client = redis.createClient();

router.post('/follow', function(req, res, next) {
    let username = req.body.username;
    let 
});

router.get('/follow', function(req, res, next) {
    
});

router.post('/publish', function(req, res, next) {
    let username = req.body.username;
    let message = req.body.message;
    
});