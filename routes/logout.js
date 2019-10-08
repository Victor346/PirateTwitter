var express = require('express');
var router = express.Router();
var redis = require('redis'), client = redis.createClient();

router.post('/', function(req, res, next) {
    let username = req.body.username;

    clientMaps.get(username).unsubscribe();
    clientMaps.get(username).quit();
    clientMaps.delete(username);

    res.render("index");
});
module.exports = router;
