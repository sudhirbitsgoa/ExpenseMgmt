module.exports = function routes(app) {
    app.get('/user', function() {
        return {
            'name': 'sudhir'
        };
    });

    app.post('/user', function(req, res) {
    	res.send({
    		name: 'sudhir'
    	})
    });
}