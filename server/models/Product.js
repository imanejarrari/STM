const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    supplierName: {
      type: String,
      required: true
        },
    supplierContactInfo: {
      type: String,
      required: true
    }, 
    costPrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    quantityInStock: {
        type: Number,
        required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = Product = mongoose.model("products", ProductSchema);
