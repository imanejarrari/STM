const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateNewSupplierInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.Supplier_Name = !isEmpty(data.Supplier_Name) ? data.Supplier_Name : "";
    data.address.street = !isEmpty(data.address.street) ? data.address.street : "";
    data.address.city = !isEmpty(data.address.city) ? data.address.city : "";
    data.address.postalCode = !isEmpty(data.address.postalCode) ? data.address.postalCode : "";
    data.address.country = !isEmpty(data.address.country) ? data.address.country : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.products.name = !isEmpty(data.products.name) ? data.products.name : "";
    data.products.description = !isEmpty(data.products.description) ? data.products.description : "";
    data.products.Price = !isEmpty(data.products.Price) ? data.products.Price : "";
    data.products.stockAvailable = !isEmpty(data.products.stockAvailable) ? data.products.stockAvailable : "";

    // Supplier Name checks
    if (Validator.isEmpty(data.Supplier_Name)) {
        errors.Supplier_Name = "Supplier Name field is required";
    }

    // Address checks
    if (Validator.isEmpty(data.address.street)) {
        errors.address = "Street field is required";
    }
    if (Validator.isEmpty(data.address.city)) {
        errors.address = "City field is required";
    }
    if (Validator.isEmpty(data.address.postalCode)) {
        errors.address = "Postal Code field is required";
    }
    if (Validator.isEmpty(data.address.country)) {
        errors.address = "Country field is required";
    }

    // Phone checks
    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Phone field is required";
    }

    // Products Name checks
    if (Validator.isEmpty(data.products.name)) {
        errors.products = errors.products || {};
        errors.products.name = "Products Name field is required";
    }

    // Products description checks
    if (Validator.isEmpty(data.products.description)) {
        errors.products = errors.products || {};
        errors.products.description = "Products description field is required";
    }

    // Products Price checks
    if (Validator.isEmpty(data.products.Price)) {
        errors.products = errors.products || {};
        errors.products.Price = "Price field is required";
    }

    // Stock Available
    if (Validator.isEmpty(data.products.stockAvailable)) {
        errors.products = errors.products || {};
        errors.products.stockAvailable = "Stock field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
