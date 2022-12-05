const express = require("express")

const router = express.Router()

const ecomModel = require("../../database/models/products")


router.get('/',function(req,res) {

  req.session.pageNum = 2;

  ecomModel.find({}).then(function(items)
  {
    
    items.splice(2,items.length-1)
      
    if(req.session.isLoggedIn)
    {
      if(req.session.isAdmin)
      {
        
        res.render("admin.ejs",{data:req.session.user,items:items ,err:false})
      
      }
      else
      {
        
        res.render("ecom.ejs",{data:req.session.user,items:items ,err:false})
      
      }
      
    }
    else
    {

      res.render("ecom.ejs",{data:{username:"guest",image:"dummy.jpg"},items:items,err:false})
    
    }
    
    }).catch(function(err)
    {
      res.end(err)
    })

})

module.exports = router