'use strict';
var express = require('express');
var app = express();

app.use(express.bodyParser());

// ## CORS middleware
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
app.use(express.logger());

app.get('/', function(req, res) {
  res.json({hello: 'world'});
});

app.post('/api', function(req, res) {
  var config = req.body;
  if(config) {
    app[config.method.toLowerCase()](config.uri, function(request, response) {
      response.json(config.response);
    });
    res.json({result:true});
  }
  else {
    res.json({error:'Must post JSON for modification of API.'});
  }
});

app.listen(3001);
console.log('caddis started on port 3001');