var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/advertiser"] = requestHandlers.advertiser;
handle["/advertisers"] = requestHandlers.advertisers;

server.start(router.route, handle);
