const express = require("express")

const router = express.Router()

const ecomModel = require("../../database/models/products")

router.route("/").get(function(req,res)
{
  var id = req.session.updateItemId;
  
  ecomModel.findOne({_id:id}).then(function(item)
  {
    if(item)
    {
      
      res.render("updateProduct.ejs",{data:item,err:false})
    }
    else
    {
      res.redirect("/guest")
    }
  })

}).post(function(req,res)
{
  var id = req.session.updateItemId;

  var name = req.body.itemName;
  var price = req.body.itemPrice;
  var quantity = req.body.itemQuantity;
  var description = req.body.itemDescription;
  var image ;
  


  ecomModel.findOne({_id:id}).then(function(item)
  {
    
    if(item)
    {
      console.log(item)
      if(req.file)
      {
        image = req.file.filename
      }
      else
      {
        image = item.itemImage;
      }
      ecomModel.updateOne({_id:id},{$set:{itemName:name,
      itemImage:image,
      itemPrice:price,
      itemDescription:description,
      itemQuantity:quantity
      }}).then(function(data)
      {
        res.status(200)
        console.log(data);
        res.redirect("/guest");
      
      }).catch(function(err)
      {
        if(err)
        {
          res.status(404).json({status:false,message:"error occurred while updating product",data:null})
        }
      })
    }
  }).catch(function(err)
  {
    res.status(404).json({status:false,message:"error occurred product not found",data:null});
  }) 
})






module.exports = router