//server.js file
var express = require('express');
var app = express(); 
const path = require('path');
var rootPath = path.normalize(__dirname + '/dist/');
var port = process.env.PORT || 4200;

var fs = require('fs');
console.log("Root path is "+ rootPath);
var fileName = rootPath + 'assets/appconfig.json';
var file = require(fileName);

file.servicesBaseUrl =  process.env.BUILDER_API_URL || 'http://localhost:8090/eqs-group';

fs.writeFile(fileName, JSON.stringify(file), function (err) {
  if (err) return console.log(err);
});

app.use(express.static(rootPath)); 
app.get('*', (req, res) => {
  res.sendFile(rootPath + '/index.html');
});
app.listen(port);
console.log("App listening on port " + port);
return 0;
