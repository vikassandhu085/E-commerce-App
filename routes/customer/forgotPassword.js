const express = require("express")

const router = express.Router()

const sendMail = require("../../utility/sendMail.js")

const userModelInstance = require("../../database/models/signup.js")

const userModel = userModelInstance.model


router.route("/").get(function(req,res)
{
  res.render("forgotPassword.ejs",{err:false})

}).post(function(req,res)
{
  var email = req.body.email
  var recipientName = req.body.username
  req.session.email = email
  
  userModel.findOne({email:email}).then(function(user)
  {
    console.log(user)
    if(user === null)
    {
      res.render("forgotPassword.ejs",{err:true,message:" email does not exist! "})
    }
    else
    {
      
      var url = `<h1>Hi ${user.username} </h1><br><br> <h2>Need to reset your password? No Problem! Just click the link given below and you will be on your way.<br> If you did not make this request, please ignore this email  </h2><a href="https://e-commerce-app-3p34g8mlvel1t7noeq.codequotient.in/changePassword/${user._id}"><button  >RESET YOUR PASSWORD</button></a>`
      sendMail(email, recipientName, "Welcome to Alibaba", "", url , function(error)
    {
      if(error)
      {
        res.render("forgotPassword.ejs",{err:true,message:" unable to send mail! "})
      }
      else
      {
        res.render("login.ejs",{err:true,message:"Please check your mail"})
      }
    }) 
      
    }
  })

})


module.exports = router