var userCtrl = require('../controllers/user_ctrl');

module.exports = function routes(app) {
    app.get('/user', function() {
        return {
            'name': 'sudhir'
        };
    });

    app.post('/user', userCtrl.addUser);
}