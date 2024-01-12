const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
  Supplier_Name: {
    type: String,
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  phone: {
    type: String,
    required: true
  },
  products: [
    {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      Price: {
        type: Number,
        required: true
      },
      stockAvailable: {
        type: Number,
        required: true
      }
    }
  ],
  Action :{
    type:String,
    required:true

  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Suppliers = mongoose.model("suppliers", SupplierSchema);
