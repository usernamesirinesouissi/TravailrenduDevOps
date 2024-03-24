const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
 
nom: {
    type:String,
    required:true,
},
prenom: {
    type:String,
    required:true,
},
adresse: {
    type:String,
    required:true,
},
tel: {
    type: String,
    required:true,
},
email: {
    type:String,
    required:true,
    unique:true,
},
password: {
    type:String,
    required:true,
},
role: {
    type: String,
    required: true,
},   
});
module.exports = User = mongoose.model("User", UserSchema)