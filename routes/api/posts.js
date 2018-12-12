const express = require('express');
const router = express.Router();

const passport = require('passport');

const Post = require('../../models/Post');


const validatePostInput = require('../../validation/post');
// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test',(req,res)=>{
    res.json({msg: 'post works'});
});

// @route   post api/posts
// @desc    create posts route
// @access  private

router.post('/',passport.authenticate('jwt',{session: false}),(req,res)=>{
    const {errors, isValid} = validatePostInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      });
  
      newPost.save().then(post => res.json(post));

});

// @route   GET api/posts/all
// @desc    get all post
// @access  Public


router.get('/',(req,res)=>{
    Post.find()
    .sort({date:-1})
    .then((posts)=>{
        res.status(200).json(posts);
    })
    .catch(
        err => res.status(404).json({err: 'no post found'})
    );
})

// @route   GET api/posts/:id
// @desc    get single post by id
// @access  Public

router.get('/:post_id',(req,res)=>{
    Post.findById(req.params.post_id)
    .then(post => res.status(200).json(post))
    .catch(
        err => res.status(404).json({err: 'no post found'})
    );
})

// @route   DELETE api/posts/:id
// @desc    get single post by id
// @access  private

router.delete('/:post_id',passport.authenticate('jwt',{session:false}),
(req,res)=>{
    console.log(req.params)
    Post.findById(req.params.post_id)
        .then((post)=>{
                // check if current user is post owner

            console.log(post.user.toString());
            console.log(req.user.id);
            if(post.user.toString() != req.user.id){
                res.status(401).json({err: 'not authorized'});
            }else{
                //delete
                post.remove()
                .then( ()=> res.status(200).json({success: true}))
                .catch(err => res.status(500).json({err: err}));
            }
        
        }
        )
        .catch(err => res.status(404).json({err: 'post not found: ' + err}));
    }
)

// @route   post api/posts/like/:post_id
// @desc    like a post
// @access  private

router.post(
    '/like/:post_id',
    passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        Post.findById(req.params.post_id)
        .then(
        (post)=>{
            //find if user has already liked the post
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                return res.status(400).json({err: 'user already liked'});
            }
            //add like to post
            post.likes.unshift({user: req.user.id});
            post.save().then( post => res.status(200).json(post));
            
        }
     ).catch(err => res.status(404).json({err: 'post not found'}));
    }
    

);

// @route   post api/posts/unlike/:post_id
// @desc    unlike a post
// @access  private

router.post('/unlike/:post_id',
passport.authenticate('jwt',{session:false}),
(req,res)=>{
    //find the post
    Post.findById(req.params.post_id)
    .then(
        (post)=>{
            //see if the user has liked it
            if(post.likes.filter( like => like.user.toString() === req.user.id).length === 0){
                return res.status(401).json({err: 'user has not liked the post'});
            }else{
                //remove the like

                post.likes.splice(post.likes.map(item => item.user.toString()).indexOf(req.user.id),1);
                post.save().then( post=> res.status(200).json(post));
            }

        }
    )
    // ).catch(
    //     err => res.status(404).json({err: 'cannot find post'})
    // )

    
}
)


// @route   post api/posts/comment/:post_id
// @desc    add a comment to a post
// @access  private

router.post('/comments/:post_id',
passport.authenticate('jwt',{session:false}),
(req,res)=>{

    Post.findById(req.params.post_id)
    .then((post)=>{
       
        const newComment = {
            user: req.user.id,
            name: req.user.name,
            avatar: req.user.avatar,
            text: req.body.text,
        }

        post.comments.unshift(newComment);
        post.save().then(post => res.status(200).json(post));
    })
    .catch(
        err=>res.status(404).json(err)
    );


}
)

// @route   delete api/posts/comment/:comment_id
// @desc    delete a comment 
// @access  private

router.delete('/comments/:post_id/:comment_id',
passport.authenticate('jwt',{session:false}),
(req,res)=>{
    

    Post.findById(req.params.post_id)
    .then((post)=>{
        //check if comment exist

        if(post.comments.filter(comment => comment.id === req.params.comment_id).length > 0){
            //remove comment    
        const commentIndex = post.comments.map(item => item.id).indexOf(req.params.comment_id);
        post.comments.splice(commentIndex,1);
        post.save().then(post => res.status(200).json(post));
        }else{
            return res.status(200).json({err:'comment not found'});
        }
        
    })
    .catch(
        err=>res.status(404).json(err)
    );


}
)

module.exports = router;