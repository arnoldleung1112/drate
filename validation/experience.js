const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data){
    let errors = {};

    // check title

    data.title = !isEmpty(data.title) ? data.title : '';
        
    if(validator.isEmpty(data.title)){
        errors.title = 'title field is required';
    }

    // check company

    data.company  = !isEmpty(data.company ) ? data.company  : '';

    if(validator.isEmpty(data.company)){
        errors.company = 'company field is required';
    }

    // check from

    data.from = !isEmpty(data.from) ? data.from : '';

        
    if(validator.isEmpty(data.from)){
        errors.from = 'from field is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
};