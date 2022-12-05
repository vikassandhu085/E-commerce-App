const express = require("express")

const router = express.Router()

const userModelInstance = require("../../database/models/signup.js")

const userModel = userModelInstance.model


router.get("/:id",function(req,res)
{
  var id =  req.params.id
  
  var verified = true;
  
  userModel.updateOne({_id:id},{isVerifiedByMail:verified}).then(function(user)
    {
      if(user)
      {
        console.log(user)
        res.redirect("/login")  
      }
      else
      {
        res.render("login.ejs",{err:true,message:"Please check your mail"})
      }
          
  }).catch(function(err)
  {
    res.end(err)
  })  
})

module.exports = router