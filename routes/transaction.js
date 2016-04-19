var transCtrl = require('../controllers/transaction_ctrl');

module.exports = function routes(app) {
    app.get('/transaction', transCtrl.getTransactionUsers);

    app.post('/transaction', transCtrl.createTransaction);
}