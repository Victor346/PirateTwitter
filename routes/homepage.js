var express = require('express');
var router = express.Router();
var redis = require('redis'), client = redis.createClient(), client2 = redis.createClient();


router.get('/', function(req, res, next) {
    let username = req.param('user');
    var listFollowing = ['Fer', 'Kim', 'Salaboy']
    var listFollowers = ['Vic', 'El papa']
    var listNoFollow = ['Loco', 'Polo']
    var listPosts = [{user: 'Vic', message: 'Me pegaron en mi casa', timestamp: '2019-01-18'}, {user: 'El papa', message: 'Toque al Fer ayer', timestamp: '2019-01-19'}, {user: 'El papa', message: 'Jaja lol', timestamp: '2019-01-20'}]

    client.lrange('listFollowing' + username, 0, -1, function(err, replyFollowing){
        client.lrange('listFollower' + username, 0, -1, function(err, replyFollowing){

        });
    });


    context = {username: username, listFollowing: listFollowing, listFollowers: listFollowers, listNoFollow: listNoFollow, listPosts: listPosts}
    res.render('homepage', context);
});

router.post('/follow', function(req, res, next) {
    let sender = req.body.user;
    let receiver = re.body.noFollow;

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
    client.lrange('listFollowers' + username, 0, -1, function(err, reply){
        for(r in reply){
            client.lpush('timelineOf' + r, message);
        }
    });

    res.redirect('/homepage', {username: username});
});
module.exports = router;