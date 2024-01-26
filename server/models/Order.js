const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    
   customerName: {
     type: String,
     required: true
   },
   customerAddress: {
     type: String,
     required: true
   },
   codePostal: {
     type: Number,
     required: true
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

   productNames: [
     {
       type: String,
       required: true
     },
   ],

   totalPrice: {
     type: Number,
     require: true
   },

   delivereyDate: {
     type: Date,
     required: true
   },

   Status: {
     type: String,
     default: 'Not Delivered'
   },
   date: {
     type: Date,
     default: Date.now
   }
});

module.exports = Order = mongoose.model("Order", OrderSchema);
