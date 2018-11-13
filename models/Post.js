const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required:true
    },
    text:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    likes:[{
        user:{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
        }],
    comments:[{
        user:{
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        text:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        avatar:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now
        }

    }]


});

module.exports = mongoose.model('posts',postSchema);

