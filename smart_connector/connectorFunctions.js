'use strict'

var ioAPIs = require('./ioAPIs')
var io = require('./constants')

var _connectionId = "";
var _exportId = "";
var _importId = "";
var _flowId = "";
var _callbackCounter = 0;

var connectors = {

    installer: {
        connectorInstallerFunction: function (options, callback) {
            console.log("Starting connector installation process... : " + JSON.stringify(options));

            var ioHandler = new ioAPIs(options["bearerToken"]);

            //creating connection
            var netsuite = {}
            netsuite.res_type = "connections";
            netsuite.body = io.data.connections;
            ioHandler.createResource(netsuite, _getIntegrationDoc);

            function _getIntegrationDoc(res) {

                if (res.error) {
                    console.log("Failed to create connection : " + JSON.stringify(res.error))
                    return callback(res.error, null)
                } else {
                    res = JSON.parse(res)
                    _connectionId = res._id;
                    ioHandler.getIntegrationDoc(options, _updateIntegrationDoc);
                    
                    //creating export
                    var netsuite = {}
                    netsuite.res_type = "exports";
                    io.data.exports._connectionId = _connectionId;
                    netsuite.body = io.data.exports;
                    ioHandler.createResource(netsuite, function(res) {
                        if (res.error) {
                            console.log("Failed to create export : " + JSON.stringify(res.error))
                            return callback(res.error, null)
                        } else {
                            console.log("Successfully created export : " + JSON.stringify(res))
                            _callbackCounter ++;
                            res = JSON.parse(res)
                            _exportId = res._id;
                            if(_callbackCounter == 3) {
                                _callback();
                            }
                        }
                    })

                    //creating import
                    var netsuite = {}
                    netsuite.res_type = "imports";
                    io.data.imports._connectionId = _connectionId;
                    netsuite.body = io.data.imports;
                    ioHandler.createResource(netsuite, function(res) {
                        if (res.error) {
                            console.log("Failed to create import : " + JSON.stringify(res.error))
                            return callback(res.error, null)
                        } else {
                            console.log("Successfully created import : " + JSON.stringify(res))
                            _callbackCounter ++;
                            res = JSON.parse(res)
                            _importId = res._id;
                            if(_callbackCounter == 3) {
                                _callback();
                            }
                        }
                    })

                }
            }

            function _updateIntegrationDoc(res) {
                if (!res.error) {
                    res = JSON.parse(res);
                    res.install = io.data.integration.install
                    res.install[0]._connectionId = _connectionId
                    res.mode = io.data.integration.mode

                    ioHandler.updateIntegration(res, function (res) {

                        if (res.error) {
                            console.log("Failed to update integration : " + JSON.stringify(res.error))
                            return callback(res.error, null);
                        }
                        _callbackCounter ++;
                        ioHandler.saveIntegrationDoc(res)
                        if(_callbackCounter == 3) {
                            _callback();
                        }
                    })
                }
            }

            function _callback() {
                //creating Flow
                var netsuite = {}
                netsuite.res_type = "flows";
                io.data.flows.pageGenerators[0]._exportId = _exportId;
                io.data.flows.pageProcessors[0]._importId = _importId;
                netsuite.body = io.data.flows;
                ioHandler.createResource(netsuite, function(res) {
                    if (res.error) {
                        console.log("Failed to create import : " + JSON.stringify(res.error))
                        return callback(res.error, null)
                    } 
                    res = JSON.parse(res);
                    _flowId = res._id;
                    console.log("Successfully created flow : " + JSON.stringify(res))
                    return callback(null, res);
                })
            }

        },

        verifyNetSuiteConnection: function (options, callback) {
            console.log("Verifying connector installation process... : " + JSON.stringify(options));

            var ioHandler = new ioAPIs(options["bearerToken"]);
            ioHandler.getIntegrationDoc(options, _updateIntegrationDoc);

            function _updateIntegrationDoc(res) {
                if (!res.error) {
                    res = JSON.parse(res);
                    res.install[0].completed = true;
                    res.mode = "settings"
                    io.ui.settings.sections[0].flows[0]._id = _flowId;
                    res.settings = io.ui.settings;

                    ioHandler.updateIntegration(res, function (res) {

                        if (res.error) {
                            console.log("Failed to update integration : " + JSON.stringify(res.error))
                            return callback(res.error, null);
                        }
                        res = JSON.parse(res)
                        ioHandler.saveIntegrationDoc(res)
                        var response = {
                            "success": true,
                            "stepsToUpdate": res.install
                        }
                        return callback(null, response);
                    })
                }
            }
        },

        updateFunction: function (options, callback) {
            console.log("Starting connector installation process... : " + JSON.stringify(options));

            callback(null, null);
        },
    },

    uninstaller: {
        integrationUninstallerFunction: function (options, callback) {
            console.log("Starting connector uninstallation process... : " + JSON.stringify(options));
            callback(null, null);
        }
    },

    settings: {
        persistSettings: function (option, callback) {
            console.log("Updating settings for connector : " + JSON.stringify(options));
            callback(null, null);
        }
    }
};

module.exports = connectors;