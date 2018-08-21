const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};

    //check name length
    if (!Validator.isLength(data.name, {min:2, max:30})){
        errors.name = 'name must be between 2 and 30 character';
    }
    //check name empty
    data.name = !isEmpty(data.name) ? data.name : '';

    if(Validator.isEmpty(data.name)){
        errors.name = 'name field is required';
    };


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
        errors.name = 'password field is required';
    };

    //check password2 empty
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(Validator.isEmpty(data.password2)){
        errors.password2 = 'password2 field is required';
    };

    return {
        errors,
        isValid: isEmpty(errors)
    }
};