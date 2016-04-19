var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Account = new Schema({
    acType: {
        type: String,
        enum: ['saving', 'salary', 'card'],
        required: true,
        index: true
    },
    amount: Number,
    userId: {
    	type: ObjectId,
    	ref: 'user',
    	index: true
    }
});

Account.index({acType: 1, userId: 1},{unique:true});

Account.statics.getByUser = function(userId, cb) {
	this.find({
		userId: userId
	}, cb);
}

module.exports = mongoose.model('account', Account);