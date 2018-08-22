const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const passport = require('passport');

//load validator
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load user model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test',(req,res)=>{
    res.json({msg: 'user works'});
});

// @route   POST api/users/register
// @desc    register user
// @access  Public

router.post('/register',(req,res)=>{

    //validating input
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid){
        
        return res.status(400).json(errors);
    }

    //register user
    User.findOne({email: req.body.email})
    .then((user)=>{
        if (user) {
            errors.email = 'email already exist';
            
            return res.status(400).json(errors);
        }else{
            const avatar = gravatar.url(req.body.email,{
                s: '200',
                r: 'pg',
                default:'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then((user)=>{
                        res.json(user);}
                    )
                    .catch((err)=>{
                        console.log(err);
                    });
                });
            });
        }
    });
});


// @route   POST api/users/login
// @desc    Login user/ Returning JWT Token
// @access  Public

router.post('/login',(req,res)=>{
    //validate input

    
    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    //login
    const email = req.body.email;
    const password = req.body.password;
    console.log('email:' + req.body.email);
    //Find user by email

    User.findOne({email : email})
        .then((user)=>{
            console.log(user);
            if (!user){
                errors.user = 'user not found';
                return res.status(404).json({errors});
            }else{

                //check user
                bcrypt.compare(password, user.password)
                .then((isMatch)=>{
                    if(isMatch){
                        // User matched

                        //create jwt payload
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }
                        //sign token
                        jwt.sign(
                            payload,
                            keys.secretOrKey, 
                            {expiresIn: 3600},
                            (err, token) => {
                                if(err){
                                    console.log(err);
                                }else{
                                    return res.json({success: true, token: 'Bearer '+ token});
                                } 
                        });
                       
                    }else{
                        errors.password = 'password incorrect'
                        return res.status(400).json({errors});
                    }
                });

            }
        });
});

// @route   GET api/users/current
// @desc    return current user
// @access  private

router.get(
    '/current',
    passport.authenticate(
        'jwt',
        {session: false}),
    (req,res)=>{
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
        });
    }
);


module.exports = router;