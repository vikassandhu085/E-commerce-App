const mongoose = require("mongoose");

module.exports.userTypeEnums = 
{
  admin : 1,
  customer : 2
}

const signupSchema = new mongoose.Schema({

  username : 
  {
    type : String,
    required : true
  },
  
  email : 
  {
    type : String,
    required : true,
    unique:true    
  },

  image : 
  {
    type : String,
    required : true
  },

  password : 
  {
    type : String,
    required : true,
    minlength : 5
  },

  isVerifiedByMail : 
  {
    type : Boolean,
    required : true
  },

  userType :
  {
    type : Number,
    required : true
  }
},
{
  timestamps : true
})

const signupModel = mongoose.model("signupSchema",signupSchema)

module.exports.model = signupModel