var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Transaction = new Schema({
    amount: {
        type: Number,
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'user',
        index: true,
        required: true
    },
    tags: {
        type: [String],
        index: true
    }
});

module.exports = mongoose.model('transaction', Transaction);