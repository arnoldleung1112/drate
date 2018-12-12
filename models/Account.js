const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSSchema = new Schema({
    user:{
        type:Schema.Types.Schema,
        ref: 'users'
    },
    balance:{
        type: Number,
        default: 0
    }
});

module.exports = Schema.model(accountSSchema,'Account')