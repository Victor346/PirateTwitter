var express = require('express');
var router = express.Router();
var redis = require('redis'), client = redis.createClient(), client2 = redis.createClient();

router.get('/', function(req, res, next) {
    let username = req.param('user');
    console.log(clientMaps);
    console.log(username);
    client.hget("users", username, function (err, result) {
        let userJSON = JSON.parse(result);
        client.lrange(userJSON.following, 0, -1, function (err, result) {
            let listFollowing = [];
            result.forEach(function (element) {
                listFollowing.push(element);
            });
            client.lrange(userJSON.followers, 0, -1, function (err, result) {
                let listFollowers = [];
                result.forEach(function (element) {
                    listFollowers.push(element);
                });
                client.lrange(userJSON.timeline, 0, -1, function(err, result){
                    let listPosts = [];
                    result.forEach(function (element) {
                        let postJSON = JSON.parse(element)
                        listPosts.push(postJSON);
                    });

                    client.hgetall('users', function(err, result){
                        let listNotFollowing = [];
                        for(user in result){
                            if(listFollowing.includes(user) === false){
                                listNotFollowing.push(user);
                            }
                        }
                        console.log(listFollowing);
                        console.log(listFollowers);
                        console.log(listNotFollowing);
                        console.log(listPosts);
    
                        context = {username: username, listFollowing: listFollowing, 
                                    listFollowers: listFollowers, listNotFollowing: listNotFollowing, 
                                    listPosts: listPosts};
                        res.render('homepage', context);
                    });
                });
            });
        });
    });
});

router.post('/follow', function(req, res, next) {
    let username = req.body.user;
    let newFollow = req.body.newFollow;

    client.lpush('listFollowing' + username, newFollow);
    client.lpush('listFollowers' + newFollow, username);

    let url = '/home?user=' + username;
    res.redirect(url);
});



router.post('/publish', function(req, res, next) {
    let username = req.body.username;
    let message = req.body.message;

    client.lrange('listFollowers' + username, 0, -1, function(err, result){
        let dateClass = new Date();
        let date = dateClass.getFullYear()+'-'+(dateClass.getMonth()+1)+'-'+dateClass.getDate();
        let messageTemp = {user: username, message: message, timestamp: date};
        let messageString = JSON.stringify(messageTemp);
        result.forEach(function(element){
            client.publish(element, messageString);
        });
    });

    let url = '/home?user=' + username;
    res.redirect(url);
});
module.exports = router;