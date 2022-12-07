const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const sendMail = require("../../utility/sendMail.js");
const userModelInstance = require("../../database/models/signup.js");

const userModel = userModelInstance.model;

router.route("/").get(function (req, res) {
  if (req.session.isLoggedIn) {
    res.render("changePassword.ejs", { err: false });
  } else {
    res.render("login.ejs", { err: true, message: "You have no authorization of that page!" });
  }
});

router.route("/:id")
  .get(function (req, res) {
    var id = req.params.id;
    userModel
      .findOne({ _id: id })
      .then(function (data) {
        if (data) {
          req.session.email = data.email;
          res.render("changePassword.ejs", { err: false });
        } else {
          res.render("login.ejs", { err: true, message: "User does not exist!" });
        }
      })
      .catch(function (err) {
        res.end(err);
      });
  })
  .post(function (req, res) {
    var email = req.session.email;
    var newPassword = req.body.newPassword;
    var rePassword = req.body.rePassword;
    console.log(email,newPassword,rePassword,'vikas 3 ');
    if (newPassword === rePassword) {
      bcrypt.hash(newPassword, 10)
        .then(function (hash) {
          console.log(hash, 'hashpassword');
          userModel.findOneAndUpdate({ email: email }, { password: hash }).then(function (user) {
            var url = `<h1>Hi ${user.username} your password has been changed successfully  </h1><a href="http://localhost:3000/login"><h2>click here to login</h2></a>`;
            sendMail(email, user.username, "Welcome to Alibaba", "click here", url, function (error) {
              if (error) {
                res.render("login.ejs", { err: true, message: "Unable to send mail" });
              } else {
                req.session.forgotmail = false;
                res.render("login.ejs", { err: true, message: "Password has been changed successfully" });
              }
            });
          });
        })
        .catch(function (err) {
          if (err) {
            console.log(err);
          }
        });
    } else {
      res.render("changePassword.ejs", { err: true, message: "Password does not match" });
    }
  });

module.exports = router;
