var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TransactionSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    account: {
    	type: ObjectId,
    	ref: 'account',
    	required: true
    },
    userId: {
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

TransactionSchema.statics.findByUser = function(userId, cb) {
    this.findOne({
        userId: userId
    }, cb);
}

module.exports = mongoose.model('Transaction', TransactionSchema, 'transactions');