'use strict'

var ioAPIs = require('./ioAPIs')
var io = require('./constants')

function ioHelper(token) {
    var _headers = {};
    _headers[io.data.network.content_header] = io.data.network.content_value;
    _headers[io.data.network.token_header] = "Bearer " + token;
    io.globals.callbackCounter = 0;

    var _ioHandler = new ioAPIs();

    this.createConnection = function (options, callback) {
        var options = options || {}
        options.res_type = "connections";
        options.body = io.data.connections;
        options.headers = _headers;
        _ioHandler.createResource(options, function(res) {
            if (res.error) {
                console.log("Failed to create connection : " + JSON.stringify(res.error))
                callback(res.error)
            } else {
                console.log("Successfully created connection : " + JSON.stringify(res))
                res = JSON.parse(res)
                io.globals.connectionId = res._id;
                callback(res)
            }
        });
    }

    this.createExports = function (options, callback) {
        var options = options || {}
        options.res_type = "exports";
        io.data.exports._connectionId = io.globals.connectionId;
        options.body = io.data.exports;
        options.headers = _headers;
        _ioHandler.createResource(options, function(res) {
            if (res.error) {
                console.log("Failed to create export : " + JSON.stringify(res.error))
                callback(res.error)
            } else {
                console.log("Successfully created export : " + JSON.stringify(res))
                io.globals.callbackCounter ++;
                res = JSON.parse(res)
                io.globals.exportId = res._id;
                if(io.globals.callbackCounter == 3) {
                    callback(res);
                }
            }
        })
    }

    this.createImports = function(options, callback) {
        var options = options || {}
        options.res_type = "imports";
        io.data.imports._connectionId = io.globals.connectionId;
        options.body = io.data.imports;
        options.headers = _headers;
        _ioHandler.createResource(options, function(res) {
            if (res.error) {
                console.log("Failed to create import : " + JSON.stringify(res.error))
                callback(res.error)
            } else {
                console.log("Successfully created import : " + JSON.stringify(res))
                io.globals.callbackCounter ++;
                res = JSON.parse(res)
                io.globals.importId = res._id;
                if(io.globals.callbackCounter == 3) {
                    callback(res);
                }
            }
        })

    }

    this.createFlows = function (options, callback) {
        var options = options || {}
        options.res_type = "flows";
        io.data.flows.pageGenerators[0]._exportId = io.globals.exportId;
        io.data.flows.pageProcessors[0]._importId = io.globals.importId;
        options.body = io.data.flows;
        options.headers = _headers;
        _ioHandler.createResource(options, function(res) {
            if (res.error) {
                console.log("Failed to create flow : " + JSON.stringify(res.error))
                return callback(res.error)
            } 
            res = JSON.parse(res);
            io.globals.flowId = res._id;
            console.log("Successfully created flow : " + JSON.stringify(res))
            return callback(res);
        })
    }
    this.updateIntegrationDoc = function(options, callback) {
        options.headers = _headers;
        _ioHandler.updateIntegration(options, function (res) {

            if (res.error) {
                console.log("Failed to update integration : " + JSON.stringify(res.error))
                return callback(res.error);
            }
            io.globals.callbackCounter ++;
            res = JSON.parse(res)
            _saveIntegrationDoc(res)
            if(io.globals.callbackCounter == 3 || options.skipCounting) {
                callback(res);
            }
        })
    }

    this.getIntegrationDoc = function (options, callback) {
        //will fetch integration doc only for the first time
        if (io.data.integrationDoc == true && io.feature_not_available) {
            callback(io.data.integration)
        } else {
            console.log("Fetching integration with id " + options._integrationId);
            options.res_type = "integrations"
            options.res_id = options._integrationId;
            options.headers = _headers;
            _ioHandler.getResource(options, callback);
        }
    }

    var _saveIntegrationDoc = function (res) {
        io.data.integration = res;
        io.data.integrationDoc = true;
        console.log("Successfully updated integration : " + JSON.stringify(res))
    }

    this.updateExports = function (options, callback) {
        var options = options || {}
        options.res_type = "exports";
        options.res_id = io.globals.exportId;
        options.body = io.data.exports;
        options.headers = _headers;
        _ioHandler.updateResource(options, function(res) {
            if (res.error) {
                console.log("Failed to update export : " + JSON.stringify(res.error))
                callback(res.error)
            } else {
                console.log("Successfully updated export : " + JSON.stringify(res))
                res = JSON.parse(res)
                callback(res);
            }
        })
    }


}

module.exports = ioHelper;


