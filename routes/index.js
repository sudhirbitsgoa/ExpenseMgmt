module.exports = function(app) {
	require('./user.js')(app);
	require('./account.js')(app);
	require('./transaction.js')(app);
}