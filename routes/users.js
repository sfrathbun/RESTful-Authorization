var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('../services/passport');


router.get("/signup", function(req, res, next) {
  res.render("signup");
});

router.get('/', function (req, res, next) {
  if (req.user) { models.users.findByPk(parseInt(req.user.UserId))
      .then(user => { models.users.findAll({})
        .then(users => {
          if (user) {
            if (user.Admin == true) {
              res.render('users', {users: users});
            } else {
              res.send("You are not authorized to access the page.");
            }
          } else {
            res.send("User not found.")
          }
        })
      })
  } else {
    res.redirect('/users/login')
  }
});

router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
        where: { Username: req.body.username },
          defaults: {
            FirstName: req.body.firstname,
            LastName: req.body.lastname,
            Email: req.body.email,
            Password: req.body.password
          }
          // the .spread checks to see if the record was created and tells us what to to from there
    }).spread(function(result, created) {
        if (created) {
          res.redirect('login');
        } else {
          res.send('This user already exists');
        }
    });
});

router.get("/login", function(req, res, next) {
  res.render("login");
});

router.post('/login', 
passport.authenticate('local', {failureRedirect: '/users/login' }),
function(req, res, next) {
      res.redirect('profile')
});

router.get("/profile", function(req, res, next) {
  if (req.user) {
    models.users.findByPk(parseInt(req.user.UserId))
    .then(user => {
      if (user) {
        res.render("profile", {
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          Username: user.Username
        });
      } else {
        res.send("User not found");
      }
    });
  } else {
    res.redirect("/users/login");
  }
});

router.get('/:id', function (req, res, next) {
  if (req.user) { models.users.findByPk(parseInt(req.user.UserId))
        .then(user => {
           
            if (user.Admin === true) {
              models.users.findByPk(parseInt(req.params.id))
              .then(user => {
              res.render('specificUser', {
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email,
                Username: user.Username,
                Admin: user.Admin,
                UserId: user.UserId,
                Password: user.Password,
                Admin: user.Admin,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
              });
            })
            } else {
              res.send("You are not authorized to access the page.");
            }
        }) 
  } else {
    res.redirect('/users/login')
  }
});

router.post('/:id', function(req, res, next) {
  let id = parseInt(req.params.id);
  models.users.findByPk(id)
    .then(makeInactive => {
      return models.users.update(
        { Deleted: !makeInactive.Deleted },
        { where: { UserId: id } }
      )
    }).then(() => res.redirect('/users'))
});

module.exports = router;

