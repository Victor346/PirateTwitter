var express = require('express');
var router = express.Router();
<<<<<<< HEAD
var redis = require('redis'), client = redis.createClient();
=======
var redis = require('redis'), client2 = redis.createClient(), client = redis.createClient()
>>>>>>> e8eb425ba67bc122f4628c890d1168395a694aff

client.on("error", function (err) {
  console.log("Error " + err);
});

<<<<<<< HEAD
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pirate' });
});

router.post('/login', function(req, res, next){
  res.render('error', { title: 'Errorrrr.'});
});
 
router.post('/signup', function(req, res, next){
  let objetoDatos = {'username': req.body.username, 'password': req.body.password, 
    'followers': 'listFollow' + req.body.username, 'following': 'listFollowing' + 
    req.body.password};
  let stringDatos = JSON.parse(objetoDatos);

  console.log(stringDatos);
  res.render('signup', {username: stringDatos , password: req.form.password});
=======
lista = ["fsdabhkfas", "asjkfg", "Mi canal favorito", "TJosdfpjdf", "FASFSD"]

client2.on("message", function (channel, message) {
  console.log("sub channel " + channel + ": " + message);
});

client2.subscribe(lista);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pirate Twitter' });
});

router.post('/login', function(req, res, next){
  let username = req.body.loginUsername
  console.log('Username from post:' + username)
  let password = req.body.loginPassword;
  client.publish('Mi canal favorito', 'Mi mama me mima');
  client.publish('fsdabhkfas', 'Mi mama me mima');
  client.publish('asjkfg', 'Mi mama me mima');
  client.publish('TJosdfpjdf', 'Mi mama me mima');
  client.publish('FASFSD', 'Mi mama me mima');
  client.hget('users', username, function(err, result){
    if(result === null){
      res.render('error', { title: "No existe dicho usuario" });
      next();
    } else {
      userJSON = JSON.parse(result);
      console.log(userJSON);
      if(password === userJSON.password){
        res.render('login', { username: userJSON.password });
      } else {
        res.render('error', { title: "Contraseña incorrecta" });
      }
      
    }
  });
  /*console.log(userRedis);
  if (userRedis === null) {
    res.render('error', { title: "No existe dicho usuario" });
    next();
  } else {
    res.render('login', { username: userRedis });
  }*/
  //res.render('login', { username: "Hola" });
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
      res.render('signup', {Mensaje: "Felicidades te registraste." , Payload: stringDatos});
    } else {
      res.render('signup', {Mensaje: "Usuario ya registrado." , Payload: stringDatos});
    }
 
  });
  
>>>>>>> e8eb425ba67bc122f4628c890d1168395a694aff
});
module.exports = router;
