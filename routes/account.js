module.exports = function routes(app) {
    app.get('/account', function() {
        return {
            name: 'salary'
        };
    });

    app.post('/account', function(req, res) {
    	res.send({
    		name: 'salary'
    	})
    });
}