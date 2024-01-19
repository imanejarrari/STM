const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
  Supplier_Name: {
    type: String,
    required: true
  },
  Email:{
    type:String,
     required:true

 },
 phone: {
  type: String,
  required: true
},
  address: {
    type:String,
    required:true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = suppliers = mongoose.model("suppliers", SupplierSchema);
