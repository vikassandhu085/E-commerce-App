const express = require("express")

const router = express.Router()

const ecomModel = require("../../database/models/products")

const cartItemModel = require("../../database/models/cart")


router.route("/").post(function(req,res)
{
  var id = req.body.id
  console.log(id)
  ecomModel.findOne({_id:id}).then(function(item)
  {
    console.log(item.itemName)
    if(req.session.isLoggedIn)
    {
      cartItemModel.findOne({itemId:id,email:req.session.email}).then(function(data)
      {
        
        if(data)
        {
          res.status(402)
          res.end("already added in your cart")
        }
        else
        {
          

          cartItemModel.create({
          
          email:req.session.user.email,
          itemId:id,
          itemName:item.itemName,
          itemImage:item.itemImage,
          itemPrice:item.itemPrice,
          itemDescription:item.itemDescription,
          quantity:1

          }).then(function()
          {
            res.status(200).json({status:true,message:"successfull",data:null})
           
          }).catch(function(err)
          {
            if(err)
            {
              console.log(err);
            }
          }) 
        }
           
      }).catch(function(err)
      {
        console.log(err)
        res.status(400).json({status:false,message:"error occurred",data:null});
      })
    }
    else
    {
      res.status(401).json({status:false,message:"please login to add item in cart",data:null})
   
    }
    
    }).catch(function(err)
    {

      res.end(err)
    
    })
})

module.exports = router