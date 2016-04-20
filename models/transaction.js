var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TransactionSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    fromAcct: {
    	type: ObjectId,
    	ref: 'Account',
    },
    toAcct: {
        type: ObjectId,
        ref: 'Account',
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        index: true,
        required: true
    },
    tags: {
        type: [String],
        index: true
    }
});

TransactionSchema.statics.findByUser = function(userId, cb) {
    this.find({
        userId: userId
    })
    .populate('userId')
    .exec(cb);
}

module.exports = mongoose.model('Transaction', TransactionSchema, 'transactions');