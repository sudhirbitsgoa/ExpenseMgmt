var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Account = new Schema({
    acType: {
        type: String,
        enum: ['saving', 'salary', 'card'],
        required: true
    },
});

module.exports = mongoose.model('account', Account);