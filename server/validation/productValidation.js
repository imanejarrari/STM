const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateNewProductInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.brand = !isEmpty(data.brand) ? data.brand : "";
  data.supplierName = !isEmpty(data.supplierName) ? data.supplierName : "";
  data.supplierContactInfo = !isEmpty(data.supplierContactInfo) ? data.supplierContactInfo : "";
  data.costPrice = !isEmpty(data.costPrice) ? data.costPrice : "";
  data.sellingPrice = !isEmpty(data.sellingPrice) ? data.sellingPrice : "";
  data.quantityInStock = !isEmpty(data.quantityInStock) ? data.quantityInStock : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Category checks
  if (Validator.isEmpty(data.category)) {
    errors.category = "Category field is required";
  }

  // Brand checks
  if (Validator.isEmpty(data.brand)) {
    errors.brand = "Brand field is required";
  }

  // Supplier Name checks
  if (Validator.isEmpty(data.supplierName)) {
    errors.supplierName = "Supplier Name field is required";
  }

  // Supplier Contact Info checks
  if (Validator.isEmpty(data.supplierContactInfo)) {
    errors.supplierContactInfo = "Supplier Contact Info field is required";
  }


  // Cost Price checks
  if (Validator.isEmpty(data.costPrice)) {
    errors.costPrice = "Cost Price field is required";
  }

  // Selling Price checks
  if (Validator.isEmpty(data.sellingPrice)) {
    errors.sellingPrice = "Selling Price field is required";
  }

  // Quantity in Stock checks
  if (Validator.isEmpty(data.quantityInStock)) {
    errors.quantityInStock = "Quantity in Stock field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

