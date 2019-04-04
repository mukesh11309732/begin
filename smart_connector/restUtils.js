'use strict'

var request = require('request')

module.exports = {
    get : function(url, queryParams, headers, callback) {
        var options = {
            url : url,
            headers : headers,
            qs : queryParams
        }
        request.get(options, function(err, res, body) {
            if(err) {
                console.log("Failed to get resource : " + JSON.stringify(err))
                var res = {}
                res.error = err;
                callback(res);
            } else {
                callback(body);
            }
        });
    },

    post : function(url, headers, body, callback) {
        var options = {
            url : url,
            headers : headers,
            body : JSON.stringify(body)
        }
        request.post(options, function(err, res, body) {
            if(err) {
                console.log("Failed to create resource : " + JSON.stringify(err))
                var res = {}
                res.error = err;
                callback(res);
            } else {
                callback(body);
            }
        });
    },

    put : function(url, headers, body, callback) {
        var options = {
            url : url,
            headers : headers,
            body : JSON.stringify(body)
        }
        request.put(options, function(err, res, body) {
            if(err) {
                console.log("Failed to update resource : " + JSON.stringify(err))
                var res = {}
                res.error = err;
                callback(res);
            } else {
                callback(body);
            }
        });
    },
}