const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data){
    let errors = {};

    // check title

    data.school = !isEmpty(data.school) ? data.school : '';
        
    if(validator.isEmpty(data.school)){
        errors.school = 'school field is required';
    }

    // check company

    data.degree  = !isEmpty(data.degree ) ? data.degree  : '';

    if(validator.isEmpty(data.degree)){
        errors.degree = 'degree field is required';
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