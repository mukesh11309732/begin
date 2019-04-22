'use strict';

var util = require('util')
    , EtailSettings = require('abstract-connector').EtailSettings
    , eTailSettingUtil = require('connector-utils')
    , logger = require('winston')
    , _ = require('lodash')
    , request = require('request')
    , jsonpath = require('jsonpath')
    , NETSUITE_CONSTANTS = require('./netsuiteConstants')
    , InstallerUtils = eTailSettingUtil.installerUtils


function NetsuiteSettings() {

    var settings = new eTailSettingUtil.Settings();
    var deltaExport = function(options, callback) {
        logger.info('Entering into deltaExport setting : ' + JSON.stringify(options))
    }

    var addPrefix = function(options, callback) {
        logger.info('Entering into addPrefix setting : ' + JSON.stringify(options))
        return settings.setFieldValues(options, callback)
    }

    var listPrefix = function(options, callback) {
        logger.info('Entering into listPrefix setting : ' + JSON.stringify(options))
        var results = [
            {id: '1', text: 'Mr'},
            {id: '2', text: 'Ms'},
            {id: '3', text: 'Mrs'}
        ]
        callback(null, results);
    }

    this.getNetsuiteCustomSettings = function () {
        var settingsToBeRegistered = [
            {name: 'deltaExport', method: deltaExport}
            , {name: 'addPrefix', method: addPrefix}
        ]
            , refreshMetaDataFunctionsToBeRegistered = [
            {name: 'listPrefix', method: listPrefix}
        ]

        return {settings: settingsToBeRegistered, refreshMetaData: refreshMetaDataFunctionsToBeRegistered}
    }

    EtailSettings.call(this, this.getNetsuiteCustomSettings(), false)
}    
    
util.inherits(NetsuiteSettings, EtailSettings)

NetsuiteSettings.prototype.getConnectorConstants = function () {
    return NETSUITE_CONSTANTS
};

module.exports = NetsuiteSettings;