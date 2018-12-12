const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        user:
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        title:
        {
            type: String,
            required: true
        },
        slogan:
        {
            type: String,
            required: true
        },
        desc:
        {
            type: String,
            required: true
        },
        Token:
        {
            type: String,
            required: true
        },
        ICOPrice:
        {
            type: Number,
            required: true
        },
        Platform:
        {
            type: String,
            required: true
        },
        Country:
        {
            type: String,
            required: true
        },
        Whitepaper:
        {
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now
        },
        avgBusinessRate:{
            type: Number,
            default: 0
        },
        avgTeamRate:{
            type: Number,
            default: 0
        },
        avgTechRate:{
            type: Number,
            default: 0
        },
        avgCompletionRate:{
            type: Number,
            default: 0
        },
        avgPrice:{
            type: Number,
            default: 0
        },
        avgVolume:{
            type: Number,
            default: 0
        },
        Jackpot:{
            type:Number,
            default:0
        },
        Thumbnail:{
            type:String
        },
        Team:
            [{
                Name:{type: String, required: true},
                Title:{type: String, required: true},
                LinkedIn:{type: String, required: true},
                avatar:{type: String}
            }]
        ,
        Review:
            [{  user:{
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
            CompletionRate:{type: Number},
            Reward:{type:Number, default:0}
            }

            ]
    }
)

module.exports = mongoose.model('Projects', projectSchema);