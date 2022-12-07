const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const sendMail = require("../../utility/sendMail.js");
const userModelInstance = require("../../database/models/signup.js");

const userModel = userModelInstance.model;
const userTypeEnums = userModelInstance.userTypeEnums;

router.route("/")
  .get(function (req, res) {
    res.render("signup.ejs", { err: false });
  })
  .post(function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var rePassword = req.body.rePassword;
    var file = req.file.filename;

    if (username && password && email && req.file && rePassword === password) {
      bcrypt.hash(password, 10)
        .then(function (hash) {
          userModel
            .create({
              username: username,
              email: email,
              image: file,
              password: hash,
              isVerifiedByMail: false,
              userType: userTypeEnums.customer,
            })
            .then(function (user) {
              var url = `<h1>Hi ${user.username} Thanks for Joining Us </h1> <a href="http://localhost:3000/verifyUser/${user._id}">click here to verify your account</a>`;

              sendMail(email,user.username, "Welcome to Alibaba", "click here to verify", url, function (error) {
                if (error) {
                  res.render("signup.ejs", { err: true, message: "Unable to send mail" });
                } else {
                  res.render("login.ejs", { err: true, message: "You have registered successfully!" });
                }
              });
            })
            .catch(function (err) {
              console.log(err);
              res.render("signup.ejs", { err: true, message: "Email already exist! Try with New one" });
            });
        })
        .catch(function (err) {
          if (err) {
            console.log(err);
          }
        });
    } else {
      res.render("signup.ejs", { err: true, message: "please enter valid details!" });
    }
  });

module.exports = router;
