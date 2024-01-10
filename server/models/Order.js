const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
 Name:{
    type:String,
    required:true
 },
 Email:{
    type:String,
     required:true

 },
 Total:{
   type:Number,
   required:true

 },
 Paid:{
    type:String,
    required:true
 },
 Date:{
    type:Date,
    required:true
 },

Status:{
    type:String,
    required:true
}
});

module.exports = Order= mongoose.model("Order", OrderSchema);