#!/usr/bin/env node
var app = require('../app');
var server = app.listen(5000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Exemple app listening at http://%s:%s', host, port);
});