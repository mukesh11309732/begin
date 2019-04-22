'use strict'
var logger= require('winston')
  , _ = require('lodash')
 

exports.preMapFunction = function(options, callback) {
    logger.info("Inside hooks - premap function : " + JSON.stringify(options));
    var prefix  = options.settings.sections[0].fields[1].value;
    if(prefix) {
        if(options.settings)
        var result = [];
        var title = options.settings.sections[0].fields[1].options[prefix-1][1];
        _.each(options.data, function(customer) {
            customer.entityId = title + ". " +  customer.entityId;
            result.push({"data" : customer});
        })
        return callback(null, result);
    } 
    return callback({"error": "Error in adding prefix to names"}, null);
}