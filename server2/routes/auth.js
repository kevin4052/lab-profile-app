const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/login", (req, res, next) => {
  console.log({loginBody: req.body});

  passport.authenticate('local', (err, user, failureDetails) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong with database query"});
    }

    if (!user) {
      console.log({ noUserFound: failureDetails});
      return res.status(401).json(failureDetails);
    }

    req.login(user, (err) => {
      console.log({ user, err });
      
      if (err) {
          return res.status(500).json({ message: "Something went wrong with login!" });
      }
      console.log({ reqUser: req.user });
      user.password = undefined;
      res.status(200).json(user);
    });

  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const { username, password, campus, course } = req.body;

  if (username === "" || password === "") {
    res.status(400).json({ message: "Indicate username and password" })
    // res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      // res.render("auth/signup", { message: "The username already exists" });
      res.status(400).json({ message: "The username already exists" })
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      campus,
      course
    });

    newUser.save((err) => {
      if (err) {
          res.status(400).json({ message: "Saving user to database error" });
          return;
      }

      req.login(newUser, (err) => {
          if (err) {
              res.status(500).json({
                  message: "Login after signup error",
              });
              return;
          }

          user.password = undefined;

          res.status(200).json({ message: "Successful login after signup" }, req.user);
      });
    });
  });
});

router.delete("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Logged Out" });
});

router.get("/loggedIn", (req, res) => {
  console.log(req.user);

  if (req.user) {
      console.log({ user: req.user });
      req.user.password = undefined;
      res.status(200).json(req.user);
      return;
  }

  res.status(401).json({ message: "Unauthorized Access!" });
});

router.get('/all-accounts', (req, res) => {
  User.find()
    .then(usersFromDB => {
      console.log({usersFromDB});

      const userList = usersFromDB.map(user => {
        user.password = undefined;
        return user;
      })

      res.status(200).json({userList})
    })
    .catch(err => console.log({ err }))
})

module.exports = router;
