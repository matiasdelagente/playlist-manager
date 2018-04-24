var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://admin:admin@ds255329.mlab.com:55329/playlist-manager');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var router = require('./routes/PlaylistRoutes.js');
app.use('/', router);

app.use(express.static('public'));

var port = 8888;
app.listen(port, () => console.log(port));