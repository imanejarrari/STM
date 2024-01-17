const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
   supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'suppliers'
    },
    Quantity:{
       type:Number,
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
 delivereyDate:{
    type:Date,
    required:true
 },

Status:{
    type:String,
    default: 'Not Delivered'
}
});

module.exports = Order= mongoose.model("Order", OrderSchema);