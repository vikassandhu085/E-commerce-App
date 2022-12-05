const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({

  email : {
   type : String,
   required : true ,
   
  },
  
  itemId : {
   type : String,
   required : true
  },

  itemName : {
   type:String,
   required:true,
   
  },
  
  itemImage : {
   type:String,
   required:true,
   
  },

  itemPrice : {
    type:String,
    required:true
  },

  itemDescription : {
    type:String,
    required:true
  },
  itemQuantity : {
    type : Number ,
    default : 1
  }
},
{
  timestamps:true
}
)

const cartItemModel = mongoose.model('cartItem',cartItemSchema)

module.exports = cartItemModel;