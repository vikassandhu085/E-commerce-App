const express = require("express")

const router = express.Router()

const ecomModel = require("../../database/models/products")

router.route("/").post(function(req,res)
{
  var id = req.body.id;
  req.session.updateItemId = id
  console.log(req.session.updateItemId)
  res.status(200)
  res.end("product id has been stored in session successfully");
  
})

module.exports = router