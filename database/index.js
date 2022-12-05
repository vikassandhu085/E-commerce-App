module.exports.init = function()
{
  const mongoose = require("mongoose");
  mongoose.connect("mongodb+srv://ecom:1234567890@cluster0.0dk2a.mongodb.net/alibabaUsers?retryWrites=true&w=majority")
  .then(function()
  {
    console.log("db is live")
  }).catch(function()
  {
    console.log("error occurred while connecting db!");
  })
}

