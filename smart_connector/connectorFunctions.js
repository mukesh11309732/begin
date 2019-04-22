'use strict'

var ioHelper = require('./ioHelper')
var io = require('./constants')
var _ = require('lodash')

var _connectionId = "";
var _exportId = "";
var _importId = "";
var _flowId = "";
var _callbackCounter = 0;

var connectors = {

    installer: {
        connectorInstallerFunction: function (options, callback) {
            console.log("Starting connector installation process... : " + JSON.stringify(options));

            var _ioHelper = new ioHelper(options["bearerToken"]);
            _ioHelper.createConnection(null, _getIntegrationDoc);

            function _getIntegrationDoc(res) {

                if (res.error) {
                    return _callback(res.error)
                }
                _ioHelper.getIntegrationDoc(options, _updateIntegrationDoc);

                _ioHelper.createExports(null, _callback);
                _ioHelper.createImports(null, _callback);
            }

            function _updateIntegrationDoc(res) {
                if (res.error) {
                    return _callback(res.error)
                }
                res = JSON.parse(res);
                res.install = io.data.integration.install
                res.install[0]._connectionId = io.globals.connectionId
                res.mode = io.data.integration.mode

                _ioHelper.updateIntegrationDoc(res, _callback)
            }

            function _callback(res) {
                _ifErrorReturnCallback(res)
                _ioHelper.createFlows(null, function (res) {
                    _ifErrorReturnCallback(res)
                    console.log("-------------------------------------------------------")
                    console.log("Installation successful")
                    return callback(null, res);
                })

            }

            function _ifErrorReturnCallback(res) {
                if (res.error) {
                    console.log("Error in installing IO Netsuite Smart connector : " + JSON.stringify(res.error))
                    return callback(res.error, null);
                }
            }

        },

        verifyNetSuiteConnection: function (options, callback) {
            console.log("Verifying connector installation process... : " + JSON.stringify(options));

            var _ioHelper = new ioHelper(options["bearerToken"]);
            _ioHelper.getIntegrationDoc(options, _updateIntegrationDoc);

            function _updateIntegrationDoc(res) {
                if (!res.error) {
                    res = JSON.parse(res);
                    res.install[0].completed = true;
                    res.mode = "settings"
                    io.ui.settings.sections[0].flows[0]._id = io.globals.flowId;
                    res.settings = io.ui.settings;
                    res.skipCounting = true;

                    _ioHelper.updateIntegrationDoc(res, function (res) {

                        if (res.error) {
                            console.log("Failed to update integration : " + JSON.stringify(res.error))
                            return callback(res.error, null);
                        }
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
        persistSettings: function (options, callback) {
            console.log("Updating settings for connector : " + JSON.stringify(options));
            var _ioHelper = new ioHelper(options["bearerToken"]);
            if (options.pending.exports_unique_delta_all) {
                
                if (options.pending.exports_unique_delta_all == true) {
                    io.data.exports.delta = {
                        "dateField": "lastmodified"
                    }
                    _ioHelper.updateExports(null, _callback);
                } else {
                    io.data.exports.delta = {
                    }
                    _ioHelper.updateExports(null, _callback);
                }
            }

            if(options.pending.exports_unique_name_prefix) {
                _callback(options)
            }
            
            function _callback(res) {
                if (res.error) {
                    console.log("Error in installing IO Netsuite Smart connector : " + JSON.stringify(res.error))
                    return callback(res.error, null);
                }
                console.log("-------------------------------------------------------")
                console.log("Settings updated")
                io.ui.settings.sections[0].fields[0].value = true;
                var response = {
                    "success": true,
                    "pending": io.ui.settings
                }
                callback(null, response);
            }
        },

        refreshMetadata : function(options, callback) {
            console.log("Refreshing settings for connector : " + JSON.stringify(options));

            var _ioHelper = new ioHelper(options["bearerToken"]);
            _ioHelper.getIntegrationDoc(options, _updateIntegrationDoc);

            function _updateIntegrationDoc(res) {
                if (!res.error) {
                    res = JSON.parse(res);
                    io.ui.settings.sections[0].fields[1].options = io.ui.metadata;
                    res.settings = io.ui.settings;
                    res.skipCounting = true;

                    _ioHelper.updateIntegrationDoc(res, function (res) {

                        if (res.error) {
                            console.log("Failed to update integration : " + JSON.stringify(res.error))
                            return callback(res.error, null);
                        }
                        return callback(null, io.ui.settings);
                    })
                }
            }
        }
    },

    hooks : {
        preMapFunction : function(options, callback) {
            console.log("Inside hooks - premap function : " + JSON.stringify(options));
            var prefix  = options.settings.sections[0].fields[1].value;
            if(prefix) {
                var title = io.ui.metadata[prefix - 1][1];
                if(options.settings)
                var result = [];
                _.each(options.data, function(customer) {
                    customer.entityId = title + ". " +  customer.entityId;
                    result.push({"data" : customer});
                })
                return callback(null, result);
            } 
            return callback(null, options);
        }
    }
};

module.exports = connectors;