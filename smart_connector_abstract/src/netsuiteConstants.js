'use strict';

var _ = require('lodash'),
    CONNECTOR_CONSTANTS = require('abstract-connector').CONNECTOR_CONSTANTS,
    installerHelperUtil = require('connector-utils').installerUtils

    , INSTALLER_CONSTANTS = {
        INSTALL_CONNECTOR_METADATA: '/configs/meta/connector.json'
    }
    , NETSUITE_CONSTANTS = {
        NETSUITE_CONNECTORID: '5ca4a7aaec5c1727922820c5',
        UPDATE_CODE_REPO: '../updateCodeRepo'
    };

_.each(INSTALLER_CONSTANTS, function (v, k) {
    if (!NETSUITE_CONSTANTS.hasOwnProperty(k))
        NETSUITE_CONSTANTS[k] = v
});

_.each(CONNECTOR_CONSTANTS, function (v, k) {
    if (!NETSUITE_CONSTANTS.hasOwnProperty(k))
        NETSUITE_CONSTANTS[k] = v
});

console.log("Constants is : " + JSON.stringify(NETSUITE_CONSTANTS));
module.exports = NETSUITE_CONSTANTS;