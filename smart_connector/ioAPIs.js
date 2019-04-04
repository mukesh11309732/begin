'use strict'

var io = require('./constants')
var rest = require('./restUtils')
var _ = require('lodash')

function ioAPIs(token) {
    var headers = {};
    headers[io.data.network.content_header] = io.data.network.content_value;
    headers[io.data.network.token_header] = "Bearer " + token;

    var _checkIfResourceExists = function (options, callback) {

        var url = io.data.network.url + options.res_type;
        var externalId = options.body.externalId;
        var queryParams = {
            "externalId": externalId
        };

        rest.get(url, queryParams, headers, function (res) {

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
        rest.get(url, null, headers, callback);
    }

    this.createResource = function (options, callback) {

        if (!options.res_type) {
            console.log("Please provide resource type");
            return;
        }
        var res_type = options.res_type;
        var url = io.data.network.url + res_type;
        var body = options.body;
        rest.post(url, headers, body, callback);

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

    this.updateIntegration = function (res, callback) {

        var url = io.data.network.url + "integrations/" + res._id;
        console.log("Installing connector: updating integration object : " + JSON.stringify(res));
        rest.put(url, headers, res, callback);
    }

    this.getIntegrationDoc = function (options, callback) {
        //will fetch integration doc only for the first time
        if (io.data.integrationDoc == true) {
            callback(io.data.integration)
        } else {
            console.log("Fetching integration with id " + options._integrationId);
            options.res_type = "integrations"
            options.res_id = options._integrationId;
            this.getResource(options, callback);
        }
    }

    this.saveIntegrationDoc = function (res) {
        io.data.integration = res;
        io.data.integrationDoc = true;
        console.log("Successfully updated integration : " + JSON.stringify(res))
    }
}



module.exports = ioAPIs;