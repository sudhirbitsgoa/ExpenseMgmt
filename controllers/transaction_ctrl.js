var Transaction = mongoose.model('Transaction');
var Account = mongoose.model('Account');


var createTransaction = function(req, res) {
    var transaction = {
        userId: req.body.userId,
        amount: req.body.amount,
        tags: req.body.tags,
        fromAcct: req.body.fromAcct,
        toAcct: req.body.toAcct
    };

    req.query.userId = req.body.userId;
    Account.debitBalance({
        account: transaction.fromAcct,
        amount: transaction.amount
    }, function(e, data) {
        console.log(e);
        Account.creditBalance({
            account: transaction.toAcct,
            amount: transaction.amount
        }, function(er, data) {
            console.log(er);
            console.log(data);
            transaction.toAcct = data._id;
   	 		var newTransaction = new Transaction(transaction);
            newTransaction.save(function(err, Trsc) {
                if (err) {
                    console.log(err);
                }
                getTransactionUsers(req, res);
            });
        });
    });

}

var getTransactionUsers = function(req, res) {
    var userId = req.query.userId;
    Transaction.findByUser(userId, function(err, trans) {
        res.send(trans);
    });
}

module.exports.createTransaction = createTransaction;
module.exports.getTransactionUsers = getTransactionUsers;