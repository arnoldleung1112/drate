const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
    let errors = {};
    // check handle

    data.handle = !isEmpty(data.handle) ? data.handle : '';


    if(!validator.isLength(data.handle, {min:2, max:40})){
        errors.handle = 'handle has to be between 2 and 40 characters';
    }

        
    if(validator.isEmpty(data.handle)){
        errors.handle = 'handle field is required';
    }

    // check status
    data.status = !isEmpty(data.status) ? data.status : '';
        
    if(validator.isEmpty(data.status)){
        errors.status = 'status field is required';
    }

    // check skills
    data.skills = !isEmpty(data.skills) ? data.skills : '';
        
    if(validator.isEmpty(data.skills)){
        errors.skills = 'skills field is required';
    }

    //check website
        
    if(!isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            errors.website = 'not a valid URL';
        }
    }

    //check twitter
        
    if(!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter = 'not a valid URL';
        }
    }
    //check youTube
        
    if(!isEmpty(data.youTube)){
        if(!validator.isURL(data.youTube)){
            errors.youTube = 'not a valid URL';
        }
    }

    //check linkedin
        
    if(!isEmpty(data.linkedin)){
        if(!validator.isURL(data.linkedin)){
            errors.linkedin = 'not a valid URL';
        }
    }

    //check instagram
        
    if(!isEmpty(data.youTube)){
        if(!validator.isURL(data.youTube)){
            errors.youTube = 'not a valid URL';
        }
    }


    return {errors, isValid: isEmpty(errors)}

}