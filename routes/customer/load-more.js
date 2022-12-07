const express = require("express")

const router = express.Router()

const ecomModel = require("../../database/models/products")


router.get("/",function(req,res)
{
  req.session.pageNum += 2;

  ecomModel.find({}).then(function(items)
    {
      var n = req.session.pageNum
      var l = items.length;
      
      if(n<=l)
      {
        items.splice(n,l-n)
      }
      else
      {
        items.splice(0,0)
      }

      if(req.session.isLoggedIn)
      {
        if(req.session.isAdmin)
        {

         res.render("admin.ejs",{data:req.session.user,items:items ,err:false})
        
        }
        else
        {
          res.render("ecom.ejs",{data:req.session.user,items:items,err:false})
        }  
      }
      else
      {

       res.render("ecom.ejs",{data:{username:"guest",image:"dummy.png"},items:items,err:false})
      
      }
    
    })

})

module.exports = router