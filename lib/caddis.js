var forever = require('forever');
var caddis = module.exports;

caddis.server = __dirname + '/caddis/server.js';

caddis.start = function(callback) {
  console.log('start forever');
  forever.startDaemon(caddis.server, {});
  // TODO: get rid of setTimeout. find event from forever.
  var timeout = setTimeout(function() {
    clearTimeout(timeout);
    callback();  
  }, 1000);
};

caddis.stop = function(callback) {
  forever.stop(caddis.server)
    .on('stop', function() {
      console.log('forever ended');
      callback();
    })
    .on('error', function(err) {
      console.log('caddis error: ' + err);
      callback(err);
    });
};