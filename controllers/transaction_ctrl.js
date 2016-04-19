var Transaction = mongoose.model('Transaction');


var createTransaction = function (req, res) {
	var transaction = {
		userId: req.body.userId,
		amount: req.body.amount,
		tags: req.body.tags
	};
	var newTransaction = new Transaction(transaction);
	newTransaction.save(function (err, Trsc) {
		res.send(Trsc);
	});
}

var getTransactionUsers = function (req, res) {
	var userId = req.query.userId;
	Transaction.findByUser(userId, function(err, trans) {
		res.send(trans);
	});
}

module.exports.createTransaction = createTransaction;
module.exports.getTransactionUsers = getTransactionUsers;
