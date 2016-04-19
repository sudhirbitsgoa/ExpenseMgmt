var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var User = new Schema({
    name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('user', User);


User.statics.findByname = function(name, cb) {
    this.find({
        name: name
    }, cb);
}