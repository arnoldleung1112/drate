const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
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
        Price:{type: Number, required: true},
        Volume:{type: String, required: true},
        Business:{type: String},
        BusinessRate:{type: Number},
        Tech:{type: String},
        TechRate:{type: Number},
        Team:{type: String},
        TeamRate:{type: Number},
        Completion:{type: String},
        CompletionRate:{type: Number}
    }
)