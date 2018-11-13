const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//load validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test',(req,res)=>{
    res.json({msg: 'profile works'});
});


// @route   GET api/profile
// @desc    get current user profile
// @access  private

router.get('',
    passport.authenticate('jwt',{session:false}), 
    (req,res)=>{
        
        Profile.findOne({user: req.user.id})
        .populate('user',['name','avatar'])
        .then(
            (profile)=>{
                
                if(!profile){
                    errors.noProfile = 'no profile for this user';
                    return res.status(404).json(errors);
                }else{
                    return res.json(profile);
                }
            }
        ).catch( err => res.status(404).json(err));
});

// @route   GET api/profile/handle/:handle
// @desc    get profile by handle
// @access  public

router.get('/handle/:handle',(req,res)=>{
    const errors = {};

    Profile.findOne({handle:req.params.handle})
    .populate('user',['name','avatar'])
    .then((profile) => {
        if(!profile){
            errors.profile = 'profile not exist';
            return res.status(404).json(errors); 
        }else{
            return res.status(200).json(profile)
        }
    })
    .catch( err=> res.status(400).json(err));
    
});

// @route   GET api/profile/user/:user_id
// @desc    get profile by user ID
// @access  public

router.get('/user/:user_id',(req,res)=>{
    const errors = {};

    Profile.findOne({user: req.params.user_id})
    .populate('user',['name','avatar'])
    .then((profile) => {
        if(!profile){
            errors.profile = 'profile not exist';
            return res.status(404).json(errors); 
        }else{
            return res.status(200).json(profile)
        }
    })
    .catch( (err)=> {
        errors.profile = 'profile not exist';
        return res.status(404).json(errors); 
    });
    
});


// @route   GET api/profile/all
// @desc    get all profiles 
// @access  public

router.get('/all',(req,res)=>{
    Profile.find()
    .populate('user',['avatar','name'])
    .then((profiles)=>{
        return res.status(200).json(profiles);
    });
});

// @route   Post api/profile
// @desc    create or edit user profile
// @access  private

router.post('/', 
    passport.authenticate('jwt', {session:false}),
    (req,res)=>{
        //validate input
       
        const {errors, isValid} = validateProfileInput(req.body);
        
        if(!isValid) return res.status(400).json(errors);

        //get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.company) profileFields.company = req.body.company;
        if(req.body.website) profileFields.website = req.body.website;
        if(req.body.location) profileFields.location = req.body.location;
        if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
        if(req.body.status) profileFields.status = req.body.status;
        if(req.body.bios) profileFields.bios = req.body.bios;
        //skills split to array
        
        if(!(typeof(req.body.skills) === undefined)){
            profileFields.skills = req.body.skills.split(',');
        }         

        //social 
        profileFields.social = {};
        if(req.body.youTube) profileFields.social.youTube = req.body.youTube;
        if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
       
        // find and update user profile
        Profile.findOne({user: req.user.id})
        .then(
            (profile) => {
                if(profile){
                    //update profile
                    Profile.findOneAndUpdate(
                        {user: req.user.id}, 
                        {$set: profileFields}, 
                        {new: true}
                    ).then(
                        profile => res.json(profile)
                    )
                }else{  
                    //create profile
                    //check if handle exist
                    Profile.findOne({handle: req.body.handle}).then(
                        (profile)=>{
                            if(profile){
                                //return error if exist
                                errors.handle = 'handle already existed';
                                return res.status(400).json(errors);
                            }else{
                                //create profile
                                new Profile(profileFields).save().then(
                                    profile => res.json(profile)
                                );
                            }
                        }
                    );
                }
            }
            
        );

    }
);

// @route   Post api/profile/experience
// @desc    add expreience to profile
// @access  private

router.post('/experience',
passport.authenticate('jwt', {session:false}),
(req,res)=>{
   
    
    const {errors,isValid} = validateExperienceInput(req.body);

    if(!isValid){
        console.log('not valid input');
        return res.status(400).json(errors);
    };

    //find profile
   
    Profile.findOne({user: req.user.id})
    .then((profile)=>{
        if(profile){
            const experience = { 
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
            };

            profile.experience.unshift(experience);
            profile.save().then(profile => res.status(200).json(profile));               
            
        }else{
            errors.profile = 'profile not found'
        }
    }
    ).catch(
        err => res.status(404).json(err)
    )
}
);


// @route   Post api/profile/education
// @desc    add education to profile
// @access  private

router.post('/education',
passport.authenticate('jwt',{session:false}),
(req,res)=>{
    const {errors, isValid} = validateEducationInput(req.body);

    if(!isValid) res.status(400).json(errors);
    //find profile
     
    Profile.findOne({user: req.user.id})
    .then((profile)=>{
        
        if(profile){

            const newEd = {
                school: req.body.school,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
            }

            console.log('newEd: ' + newEd);
            profile.education.unshift(newEd);
            profile.save().then(
                profile => res.status(200).json(profile)
            );
        }else{
            errors.profile = 'profile not found';
            res.status(404).json(errors);
        }
    }).catch(err=> res.status(404).json(err));
    
});


// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  private

router.delete('/experience/:exp_id',
passport.authenticate('jwt',{session:false}),
(req,res)=>{
    
    //find profile
     
    Profile.findOne({user: req.user.id})
    .then((profile)=>{
    const removeIndex = profile.experience
    .map(item => item.id)
    .indexOf(req.params.exp_id);
    
    profile.experience.splice(removeIndex,1);

    profile.save().then(profile =>res.json(profile));
       
    }).catch(err=> res.status(404).json(err));
    
});


// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  private

router.delete('/education/:edu_id',
passport.authenticate('jwt',{session:false}),
(req,res)=>{
    
    //find profile
     
    Profile.findOne({user: req.user.id})
    .then((profile)=>{
    const removeIndex = profile.education
    .map(item => item.id)
    .indexOf(req.params.edu_id);
    
    profile.education.splice(removeIndex,1);

    profile.save().then(profile =>res.json(profile));
       
    }).catch(err=> res.status(404).json(err));
    
});


// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  private

router.delete('/',
passport.authenticate('jwt',{session:false}),
(req,res)=>{
        
    Profile.findOneAndRemove({user: req.user.id})
    .then(()=>{
        User.findOneAndRemove({_id: req.user.id})
        .then(
            ()=>res.json({success: true})
        )
       
    }).catch(err=> res.status(404).json(err));
    
});


module.exports = router;