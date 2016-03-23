var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
/*var uiBootstrap = require('angular-ui-bootstrap');*/
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
/*app.use(uiBootstrap());*/
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', function(req, res){
    res.send('hello world');
});
require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app);
app.listen(port, ipaddress);