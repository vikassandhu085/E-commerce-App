const express = require("express")

const router = express.Router()

const cartItemModel = require("../../database/models/cart")



router.route("/").get(function(req,res)
{
  if(req.session.isLoggedIn)
  {
    cartItemModel.find({email:req.session.user.email}).then(function(items)
  {
    res.render("mycart.ejs",{data:req.session.user,items:items,err:false,quantity:1})
    
  })
  }
}).post(function(req,res)
{
   var id = req.body.id
   cartItemModel.deleteOne({_id:id}).then(function()
   {
     res.status(200).json({status:true,message:"successfull",data:null})
   }).catch(function()
   {
     res.status(404).json({status:false,message:"error occurred while deleting from db",data:null})
   })
})

module.exports = router