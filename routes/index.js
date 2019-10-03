var express = require('express');
var router = express.Router();
var redis = require('redis'), client = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.render('index', { title: 'Pirate' });
=======
  res.render('index', { title: 'Pirate Twitter' });
>>>>>>> 2ee424920bb993b1c2ae570309085c37c5f20cce
});

router.post('/login', function(req, res, next){
  res.render('error', { title: 'Errorrrr.'});
});
 
router.post('/signup', function(req, res, next){
  let objetoDatos = {'username': req.body.username, 'password': req.body.password, 
    'followers': 'listFollow' + req.body.username, 'following': 'listFollowing' + 
    req.body.password};
  let stringDatos = JSON.password(objetoDatos);

  console.log(stringDatos);
  res.render('signup', {username: stringDatos , password: req.form.password});
});
module.exports = router;
