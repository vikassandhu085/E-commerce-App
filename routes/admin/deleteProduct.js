const express = require("express")

const router = express.Router()

const ecomModel = require("../../database/models/products")


router.route("/").post(function(req,res)
{
  var id = req.body.id;

  ecomModel.deleteOne({_id:id}).then(function()
  {
    res.status(200).json({status:true,message:"successfull",data:null})
  
  }).catch(function(err)
  {
    if(err)
    {
      res.status(404).json({status:false,message:"error occurred while deleting product",data:null})
    }
  })
})


module.exports = router