const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAddSupplierInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.Supplier_Name = !isEmpty(data.Supplier_Name) ? data.Supplier_Name : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.Email = !isEmpty(data.Email) ? data.Email : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.date = !isEmpty(data.date) ? data.date : "";

  // Supplier Name checks
  if (Validator.isEmpty(data.Supplier_Name)) {
    errors.Supplier_Name = "Supplier Name field is required";
  }

  // Phone checks
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.Email)) {
    errors.Email = "Email field is required";
  } else if (!Validator.isEmail(data.Email)) {
    errors.Email = "Email is invalid";
  }

  // Address checks
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }

  // Date checks
  if (Validator.isEmpty(data.date)) {
    errors.date = "Date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
