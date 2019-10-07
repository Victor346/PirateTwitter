var express = require('express');
var router = express.Router();
var redis = require('redis'), client = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pirate Twitter' });
});

router.post('/login', function(req, res, next){
  res.render('error', { title: 'Errorrrr.'});
});
 
router.post('/signup', function(req, res, next){
  let username = req.body.username;
  let password = req.body.password;
  let objetoDatos = {password: password, 
    followers: 'listFollowers' + username, following: 'listFollowing' + 
    username, timeline: 'timelineOf' + username};
  let stringDatos = JSON.stringify(objetoDatos);
  client.hget("users", username, function(err, result){
    if(result === null){
      client.hset("users", username, stringDatos);
      client.lpush(objetoDatos.following, username);
      client.lpush(objetoDatos.followers, username);
      client.lpush(objetoDatos.timeline, 'Me uni a Pirate Twitter - Vic');
      res.render('signup', {Mensaje: "Felicidades te registraste" , Payload: stringDatos});
    } else {
      res.render('signup', {Mensaje: "Lo siento amigo" , Payload: stringDatos});
    }
 
  });
  
});
module.exports = router;
