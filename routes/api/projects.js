const express = require('express');
const router = express.Router();
const passport = require('passport');

const Project = require('../../models/Project');
const User = require('../../models/User')

router.get('/',(req,res)=>{
    res.status(200).json({success: true})
});

//create projects

// @route   post api/projects
// @desc    create project for review
// @access  private
router.post('/',passport.authenticate('jwt', {session: false}),(req,res)=>{
    
    User.findById(req.user.id)
    .then(user => {
        user.balance -= 50;
        user.save()
    })

    const newProject = new Project({
        user: req.user.id,
        title:req.body.title,
        slogan:req.body.slogan,
        desc:req.body.desc,
        Token:req.body.Token,
        ICOPrice:req.body.ICOPrice,
        Platform:req.body.Platform,
        Country:req.body.Country,
        Whitepaper:req.body.Whitepaper,
        Jackpot: 50,
        Thumbnail: req.body.Thumbnail
    })

    newProject.save()
    .then( project=>res.status(200).json(project))
    .catch(err => res.status(400).json(err))
    
})

// @route   get api/projects
// @desc    get all projects 
// @access  public
router.get('/all',(req,res)=>{
    
    Project.find()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => res.status(400).json(err));
   
})

// @route   get api/projects/:id
// @desc    get all projects 
// @access  public
router.get('/:projectId',(req,res)=>{
    
    Project.findById(req.params.projectId)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => res.status(400).json(err));
   
})

//@route    post api/projects/reviews/:projectId
// @desc    add new reviews to project
// @access  private

router.post('/reviews/:projectId',
            passport.authenticate('jwt',{session:false}),
            (req,res)=>{
                Project.findById(req.params.projectId)
                .then((project)=>{
                    const avgBusinessRate = (project.avgBusinessRate * project.Review.length + parseFloat(req.body.BusinessRate))/(project.Review.length+1);
                    const avgTechRate = (project.avgTechRate * project.Review.length + parseFloat(req.body.TechRate))/(project.Review.length+1);
                    const avgCompletionRate = (project.avgCompletionRate * project.Review.length + parseFloat(req.body.CompletionRate))/(project.Review.length+1);                    
                    const avgTeamRate = (project.avgTeamRate * project.Review.length + parseFloat(req.body.TeamRate))/(project.Review.length+1);
                    const avgPrice = (project.avgPrice * project.Review.length + parseFloat(req.body.Price))/(project.Review.length+1);
                    const avgVolume = (project.avgVolume * project.Review.length + parseFloat(req.body.Volume))/(project.Review.length+1);

                    const newReview = {
                        user: req.user.id,
                        name: req.user.name,
                        avatar: req.user.avatar,
                        Price:req.body.Price,
                        Volume:req.body.Volume,
                        Business:req.body.Business,
                        BusinessRate:parseFloat(req.body.BusinessRate),
                        Tech:req.body.Tech,
                        TechRate:parseFloat(req.body.TechRate),
                        Team:req.body.Team,
                        TeamRate:parseFloat(req.body.TeamRate),
                        Completion:req.body.Completion,
                        CompletionRate:parseFloat(req.body.CompletionRate),
                    }

                    project.avgBusinessRate = avgBusinessRate;
                    project.avgTechRate = avgTechRate;
                    project.avgTeamRate = avgTeamRate;
                    project.avgCompletionRate = avgCompletionRate;
                    project.avgPrice = avgPrice;
                    project.avgVolume = avgVolume;

                    project.Review.unshift(newReview);
                    project.save().then(project => res.status(200).json(project));
                })
                .catch(
                    err=>res.status(404).json(err)
                );
            }
);


module.exports = router