module.exports = function routes(app) {
    app.get('/transaction', function() {
        return {
            '_id': 'trans1'
        };
    });

    app.post('/transaction', function(req, res) {
    	res.send({
    		'_id': 'trans1'
    	})
    });
}