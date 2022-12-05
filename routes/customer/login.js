const express = require("express")

const bcrypt = require('bcrypt');

const router = express.Router()

const userModelInstance = require("../../database/models/signup")

const userModel = userModelInstance.model


router.route("/").get(function(req,res)
{
  res.render("login.ejs",{err:false})

}).post(function(req,res)
{ 
  var email = req.body.email;
  var password = req.body.password;
  

  if(email && password)
  {
    userModel.findOne({email:email}).then(function(data)
    {
      console.log(data)
      var user = data;
      if(data === null)
      {
        res.render("login.ejs",{err:true,message:"email and password does not exist! "})
      }
      var hash = data.password
      
      bcrypt.compare(password, hash).then(function(result) {
       console.log(result)
       if(result===true)
       {
         if(user.isVerifiedByMail)
         {

           if(user.userType === 1)
           {
            req.session.isAdmin = true
           }

           req.session.pageNum = 2;
           req.session.isLoggedIn = true;
           req.session.user = user;
           req.session.email = user.email;
           res.redirect("/");
        
          }
          else 
          {
            res.render("login.ejs",{err:true,message:"Please check your mail"}) 
          }

       }
       else
       {
         res.render("login.ejs",{err:true,message:"INCORRECT PASSWORD"})
       }
       
      });

      
      
    }).catch(function(err)
    {
      res.render("login.ejs",{err:true,message:err})
    })
  }
  else
  {
    res.render("login.ejs",{err:true,message:"please enter email & password!"})
  }

})


module.exports = router