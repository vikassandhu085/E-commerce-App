const express = require("express")

const router = express.Router()

const ecomModel = require("../../database/models/products")


router.route("/").get(function(req,res)
{
  if(req.session.isAdmin)
  {
    res.render("addProduct.ejs",{err:false});
  }
  else
  {
    res.redirect("/")
  }
  

}).post(function(req,res)
{

  ecomModel.create({
   
  itemName : req.body.itemName,
  itemPrice : req.body.itemPrice,
  itemImage : req.file.filename,
  itemDescription : req.body.itemDescription,
  itemQuantity : req.body.itemQuantity

  }).then(function()
  {
    res.status(200)
    res.render("addProduct.ejs",{err:true,message:"Product has been added successfully."});
    
  }).catch(function(err)
  {
    if(err)
    {
      console.log(err);
    }
  })
})


module.exports = router