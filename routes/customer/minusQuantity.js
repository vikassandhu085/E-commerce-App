const express = require("express")

const router = express.Router()

const cartModel = require("../../database/models/cart")


router.post("/",function(req,res)
{
  var id = req.body.id
  
  cartModel.findOne({_id:id}).then(function(item)
  {
    if(item)
    {  
       
      if(item.itemQuantity>0)
      {
      cartModel.updateOne({_id:id},{$set:{itemQuantity:item.itemQuantity-1}}).then(function()
      {
        res.status(200).json({status:true,message:"successfull",data:null})
      })
      }
      else
      {
        res.status(400).json({status:false,message:"quantity already 1",data:null})
      }
    }
    else
    {
      res.status(404)
      res.end("error occuurred item not found")
    }
  })
})

module.exports = router