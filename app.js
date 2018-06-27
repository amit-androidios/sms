var http = require('http');
var express = require('express');
var bodyParser = require("body-parser");
var Nexmo = require('nexmo');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const nexmo = new Nexmo({
  apiKey: 'e5e20d95',
  apiSecret: 'PRO5AbSvyfrI1gDm'
});

const from = 'Nexmo';
var to="918604436630"
var text;

app.get('/otp/:otp', function (req, res) {
	
   text='Hi, The OTP is :' +req.params.otp;
   
   nexmo.message.sendSms(from, to, text, (error, response) => {
	if(error) {
		throw error;
	} else if(response.messages[0].status != '0') {
		console.log(response);
		throw 'Nexmo returned back a non-zero status';
	} else {
		console.log("SMS sent successfully");
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({ status: "success" }, null, 3));
	}
});
   
});

var server = app.listen(8081, function () {
	
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
  
})