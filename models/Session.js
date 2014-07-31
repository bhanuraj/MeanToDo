var Mongoose = require('mongoose');

exports.SessionSchema = new Mongoose.Schema({
  title : { type : String, required : true },
  presenter : { type : String, required : false },
  date : { type : Date, required : true },
  rating : { type : Number, required : true },
  noofusersrated : { type : Number, required : true },
  presentationuploaded : { type : Boolean, default : false }
});