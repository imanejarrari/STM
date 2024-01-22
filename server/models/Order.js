const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
   
   customerName: String,
   customerAddress: String,
   CodePostal:Number,
   products: [
     {
       productId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Product',
       },
       quantity: Number,
     },
   ],
   totalPrice: Number,

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