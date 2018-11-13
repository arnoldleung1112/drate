const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};

    //check email empty
    data.email = !isEmpty(data.email) ? data.email : '';

    if(Validator.isEmpty(data.email)){
        errors.email = 'email field is required';
    };

     //check email
    if(!Validator.isEmail(data.email)){
        errors.email = 'email is inValid';
    }

    //check password empty
    data.password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.password)){
        errors.password = 'password field is required';
    };

    return {
        errors,
        isValid: isEmpty(errors)
    }
};