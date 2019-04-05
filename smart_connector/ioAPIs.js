'use strict'

var io = require('./constants')
var rest = require('./restUtils')
var _ = require('lodash')

function ioAPIs() {
    

    var _checkIfResourceExists = function (options, callback) {

        var url = io.data.network.url + options.res_type;
        var externalId = options.body.externalId;
        var queryParams = {
            "externalId": externalId
        };

        rest.get(url, queryParams, options.headers, function (res) {

            var response = null;
            if (!res.error && res != "" && typeof res == "string") {
                res = JSON.parse(res);
                if (res[0].externalId == externalId) {
                    console.log(options.res_type + " with external id " + externalId + " is already present in io");
                    res = res[0];
                    response = JSON.stringify(res);
                }
            }
            callback(response);
        });
    }

    this.getResource = function (options, callback) {

        if (!options.res_type || !options.res_id) {
            console.log("Please provide resource type and resource id");
            return;
        }
        var url = io.data.network.url + options.res_type + "/" + options.res_id;
        rest.get(url, null, options.headers, callback);
    }

    this.createResource = function (options, callback) {

        if (!options.res_type) {
            console.log("Please provide resource type");
            return;
        }
        var res_type = options.res_type;
        var url = io.data.network.url + res_type;
        var body = options.body;
        rest.post(url, options.headers, body, callback);

        /*
        _checkIfResourceExists(options, _createResource);

        function _createResource(res) {
            if (res) {
                callback(res);
            } else {
                rest.post(url, headers, body, callback);
            }
        }*/

    }

    this.updateIntegration = function (options, callback) {

        var url = io.data.network.url + "integrations/" + options._id;
        console.log("Installing connector: updating integration object : " + JSON.stringify(options));
        rest.put(url, options.headers, options, callback);
    }
}



module.exports = ioAPIs;