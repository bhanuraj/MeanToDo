var Mongoose = require('mongoose');

exports.UserSchema = new Mongoose.Schema({
  name : { type : String, required : true },
  email : { type : String, required : true },
  mypresentations : { type : [Mongoose.Schema.Types.ObjectId], ref: 'Session', required : false },
  votedpresentations  : { type : [Mongoose.Schema.Types.ObjectId], ref: 'Session', required : false },
  isadmin : { type : Boolean, default : false }
});