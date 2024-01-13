const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports= function validateNewSupplierInput(data){

    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.Supplier_Name=!isEmpty(data.Supplier_Name)? data.Supplier_Name :"";
    data.address=!isEmpty(data.address)? data.address:"";
    data.phone=!isEmpty(data.phone)? data.phone:"";
    data.products.name=!isEmpty(data.products.name)? data.products.name:"";
    data.products.description=!isEmpty(data.products.description)? data.products.description:"";
    data.products.Price=!isEmpty(data.products.Price)? data.products.Price:"";
    data.products.stockAvailable=!isEmpty(data.products.stockAvailable)? data.products.stockAvailable:"";
    


    

}