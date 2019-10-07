var express = require('express');
var router = express.Router();
var redis = require('redis'), client2 = redis.createClient(), client = redis.createClient()

client.on("error", function (err) {
  console.log("Error " + err);
});

lista = ["fsdabhkfas", "asjkfg", "Mi canal favorito", "TJosdfpjdf", "FASFSD"]

client2.on("message", function (channel, message) {
  console.log("sub channel " + channel + ": " + message);
});

client2.subscribe(lista);

router.get('/test', function(req, res, next){
  listFollowing = ['Fer', 'Kim', 'Salaboy']
  listFollowers = ['Vic', 'El papa']
  listNoFollow = ['Loco', 'Polo']
  listPosts = [{user: 'Vic', message: 'Me pegaron en mi casa', timestamp: '2019-01-18'}, {user: 'El papa', message: 'Toque al Fer ayer', timestamp: '2019-01-19'}, {user: 'El papa', message: 'Jaja lol', timestamp: '2019-01-20'}]
  context = {listFollowing: listFollowing, listFollowers: listFollowers, listNoFollow: listNoFollow, listPosts: listPosts}
  res.render('homepage', context);
});

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
  
});
module.exports = router;
