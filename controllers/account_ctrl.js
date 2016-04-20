var Account = mongoose.model('Account');

var createAccount = function(req, res) {
	var account = {
		acType: req.body.acType,
		amount: req.body.amount,
		userId: req.body.userId
	}
	var newAccount = new Account(account);
	newAccount.save(function(err, acct) {
		if(err){
			return res.send(err);
		}
		res.send(acct);
	});
}

var getAccountByUser = function(req, res) {
	var userId = req.query.userId;
	Account.getByUser(userId, function(err, accts) {
		res.send(accts);
	});
}

module.exports.createAccount = createAccount;
module.exports.getAccountByUser = getAccountByUser;