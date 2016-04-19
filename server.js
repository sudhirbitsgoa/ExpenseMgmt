var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('https'),
    path = require('path')
mongoose = require('mongoose');

var app = express();
mongoose.connect('mongodb://localhost/bank');
mongoose.set('debug', true);
app.use(express.static(path.resolve(__dirname, 'client')));
app.use(bodyParser.json());

function decoreURI(url) {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
        url = url,
        params = {},
        match;
    while (match = regex.exec(url)) {
        params[match[1]] = match[2];
    }
    return params;
}
require('./models');
require('./routes')(app);

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');