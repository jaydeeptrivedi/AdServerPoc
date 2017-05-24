var querystring = require('querystring'),
fs = require('fs'),
formidable = require('formidable'),
dbWrapper = require('./dbWrapper');

function start(response) {
  console.log("Request handler 'start' was called.");
  var body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" '+
  'content="text/html; charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '/advertiser - Adds new advertiser' + '</br>' +
  '/advertisers - Lists all advertisers' + '</br>' +
  '</body>'+
  '</html>';
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}
function advertiser(response, request) {
  console.log("Request handler 'advertiser' was called.");
  var form = formidable.IncomingForm();
  //dbWrapper.createAdvertiserTable(fields.advertiserId);
  form.parse(request, function (err, fields) {
    dbWrapper.addNewAdvertiser(fields.advertiserId);
  });
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end();
}
function advertisers(response) {
  console.log("Request handler 'advertisers' was called.");
  dbWrapper.loadAllAdvertisers();
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end();

}
exports.advertiser = advertiser;
exports.advertisers = advertisers;
exports.start = start;
