var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('https'),
    path = require('path')
mongoose = require('mongoose');

var app = express();
mongoose.connect('mongodb://localhost/bank');
mongoose.set('debug', true);
app.use(express.static(path.resolve(__dirname, 'build')));
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

/*app.get('/token', function(req, res) {
	var params = decoreURI(req.url)
	http.get('https://github.com/login/oauth/access_token?client_id=xxxxxxxxxxxx&client_secret=xxxxxxxxxxxxxxx&code=' + params.code, function (data) {
		var str=''
		data.on('data', function (chunk) {
			str += chunk;
		});
		data.on('end', function () {
			console.log(str);
			res.send(decoreURI('?' + str));
		});
	});
})

app.get('/user', function(req, res) {
	var params = decoreURI(req.url);
	http.get('https://github.com/user?access_token=' + params.access_token, function(data) {
		var str=''
		data.on('data', function (chunk) {
			str += chunk;
		});
		data.on('end', function () {
			console.log(str);
			res.send(str);
		});
	})
})*/
app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');