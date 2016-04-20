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
    	ref: 'User',
    	index: true
    }
});

Account.index({acType: 1, userId: 1},{unique:true});

Account.statics.getByUser = function(userId, cb) {
	this.find({
		userId: userId
	}, cb);
}

Account.statics.creditBalance = function(data, cb) {
    var self =  this;
    amount =  data.amount;
    if(!data.account) {
        this.findOne({acType:'merchant'}, function(err, acctd) {
            this.findOneAndUpdate({_id: acctd._id }, {$inc: {amount: amount}}, cb);    
        })
    } else {
        this.findOneAndUpdate({_id: data.account}, {$inc: {amount: amount}}, cb);
    }
    
}

Account.statics.debitBalance = function(data, cb) {
    amount = data.amount;
    this.findOneAndUpdate({_id: data.account}, {$inc:{amount: -amount}}, cb);
}

module.exports = mongoose.model('Account', Account, 'accounts');