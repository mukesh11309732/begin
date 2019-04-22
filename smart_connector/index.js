var expressExtension = require('express-integrator-extension');
var connectors = require('./src/connectorFunctions');

var systemToken = 'd663f86198864ebdb42efec2867469b8';
var options = {
  connectors: { "5ca4a7aaec5c1727922820c5" : connectors },
  //diy : connectors,
  systemToken: systemToken,
  port: 9001
};

expressExtension.createServer(options, function (err) {
    if(err) {
        console.log("Server failed to start");
        throw err;
    }
    console.log("Server is running ");
});