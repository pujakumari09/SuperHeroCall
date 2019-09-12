var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

app.use(logger('dev'));
app.use(bodyParser.json());

app.use("/api",require('./server/routes.js'));
app.use(express.static(path.join(__dirname, '/client')));

app.listen(3000, function(req, res){
  console.log("Server is running on port 3000.............");
});
