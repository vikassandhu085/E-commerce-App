const mongoose = require("mongoose")

const ecomItemSchema = new mongoose.Schema({

  itemName : {
   type:String,
   required:true,
   unique:true
  },
  
  itemImage : {
   type:String,
   required:true,
   unique:true
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
    type : Number,
    required : true
  }
},
{
  timestamps:true
}
)

const ecomItemModel = mongoose.model('ecomItem',ecomItemSchema)

module.exports = ecomItemModel;