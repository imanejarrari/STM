const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    
   customerName:{
     type:String,
     required:true

   },
   customerAddress:{
    type:String,
    required:true
   },
   codePostal:{
    type:Number,
    required:true

   },
   products: [
     {
       productId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Product',
       },
       quantity: Number,
     },
   ],

   totalPrice:{
         type:Number,
         require:true
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