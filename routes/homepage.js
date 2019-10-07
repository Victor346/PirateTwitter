var express = require('express');
var router = express.Router();
var redis = require('redis'), client = redis.createClient(), client2 = redis.createClient();

router.get('/', function(req, res, next) {
    
});

router.post('/follow', function(req, res, next) {
    let sender = req.body.sender;
    let receiver = re.body.receiver;

    client.lpush('listFollowing' + receiver, sender);
    client.lpush('listFollowers' + sender, receiver);

    client2.unsubscribe();

    client.lrange('listFollowing' + receiver, 0, -1, function(err, reply){
        client.subscribe(reply);
    });

    res.render();
});



router.post('/publish', function(req, res, next) {
    let username = req.body.username;
    let message = req.body.message;

    client.publish(username, message);
    client.lpush('timelineOf' + username, message);

    res.render();
});
module.exports = router;