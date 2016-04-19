var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var User = new Schema({
    name: {
        type: String,
        required: true
    },
});

User.statics.findByName = function(name, cb) {
    this.findOne({
        name: name
    }, cb);
}

User.statics.addUser = function(name, cb) {
	var newUser = new mongoose.model('User', User);
	newUser.name = name;
	newUser.save(cb);
}

module.exports = mongoose.model('User', User, 'users');