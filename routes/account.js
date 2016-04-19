var actsCtrl = require('../controllers/account_ctrl.js');

module.exports = function routes(app) {
    app.get('/account', actsCtrl.getAccountByUser);

    app.post('/account', actsCtrl.createAccount);
}