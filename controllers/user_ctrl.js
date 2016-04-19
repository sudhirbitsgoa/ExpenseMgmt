var userModel = mongoose.model('User');

var addUser = function(req, res) {
	var newUser = new userModel();
	newUser.name = req.body.name;
	newUser.save(function (err, user) {
		res.send(user);
	})
}

var loginUser = function(req, res) {
	userModel.findByName(req.body.name, function(err, user) {
		if(user) {
			res.send(user);
		} else {
			addUser(req, res);
		}
	});
}

module.exports.addUser = loginUser;