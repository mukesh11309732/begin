'use strict'

var _ = require('lodash'),
  installerUtils = require('connector-utils').installerUtils,
  util = require('util'),
  logger = require('winston'),
  AbstractVersionUpdate = require('connector-utils').AbstractVersionUpdate

function VersionUpdater(options) {
  this.updateLogic = updateLogic
  AbstractVersionUpdate.call(this, options)
}

util.inherits(VersionUpdater, AbstractVersionUpdate)

/**
 * Adding a flow REST to REST
 * Need to create connection, import, export, flow
 * 
 * @param {callback} callback 
 */
var updateLogic = function (callback) {
  logger.info("Inside update logic : " + JSON.stringify(this))
  let that = this;
  let token = this._bearerToken;
  var data = {
      "type": "rest",
      "name": "RestSource_node",
      "externalId": "rest_mockable_io",
      "rest": {
        "baseURI": "http://demo8554026.mockable.io",
        "mediaType": "json",
        "authType": "basic",
        "encryptedFields": [],
        "unencryptedFields": [],
        "scope": [],
        "pingRelativeURI": "get",
        "pingSuccessValues": [],
        "pingMethod": "GET",
        "basicAuth": {
          "username": "test",
          "password": "test"
        }
      }
    },
    opts = {
      bearerToken: token,
      resourcetype: 'connections',
      data: data
    }

  installerUtils.integratorRestClient(opts, function (err, res, body) {
    if (err) {
      logger.info("Inside rest::create connections error callback : " + JSON.stringify(err))
      return callback(err)
    }
    logger.info("Inside rest::create connections callback : " + JSON.stringify(body))
    let _connectionId = body._id;
    var data = {
        "_connectionId": _connectionId,
        "name": "Rest Export",
        "description": "data from get api",
        "asynchronous": true,
        "type": "test",
        "sampleData": {
          "msg": "Hello World."
        },
        "test": {
          "limit": 1
        },
        "rest": {
          "relativeURI": "/get",
          "method": "GET"
        }
      },
      opts = {
        bearerToken: token,
        resourcetype: 'exports',
        data: data
      }
    installerUtils.integratorRestClient(opts, function (err, res, body) {
      if (err) {
        logger.info("Inside rest::create exports error callback : " + JSON.stringify(err))
        return callback(err)
      }

      logger.info("Inside rest::create exports callback : " + JSON.stringify(body))
      let _exportId = body._id;
      var data = {
          "_connectionId": _connectionId,
          "name": "rest Import",
          "description": "data will to imported to rest api post",
          "sampleData": {
            "msg": "message"
          },
          "responseTransform": {
            "type": "expression",
            "expression": {
              "version": "1"
            },
            "version": "1"
          },
          "parsers": [],
          "distributed": false,
          "lookups": [],
          "rest": {
            "relativeURI": [
              "/upload"
            ],
            "method": [
              "POST"
            ],
            "body": [
              ""
            ],
            "responseIdPath": [
              ""
            ],
            "successPath": [
              ""
            ]
          }
        },
        opts = {
          bearerToken: token,
          resourcetype: 'imports',
          data: data
        }

      installerUtils.integratorRestClient(opts, function (err, res, body) {
        if (err) {
          logger.info("Inside rest::create imports error callback : " + JSON.stringify(err))
          return callback(err)
        }

        logger.info("Inside rest::create imports callback : " + JSON.stringify(body))
        let _importId = body._id;
        var data = {
            "name": "REST API to REST API",
            "disabled": false,
            "_exportId": _exportId,
            "_importId": _importId
          },
          opts = {
            bearerToken: token,
            resourcetype: 'flows',
            data: data
          }
        installerUtils.integratorRestClient(opts, function (err, res, body) {
          if (err) {
            logger.info("Inside rest::create flows error callback : " + JSON.stringify(err))
            return callback(err)
          }

          logger.info("Inside rest::create flows callback : " + JSON.stringify(body))
          let integration = that.getIntegration();
          var data = {
            "showSchedule": true,
            "showMapping": true,
            "_id": body._id
        }
        var field = {
          "value": false,
          "name": "exports_"+_exportId+"_newSetting",
          "type": "checkbox",
          "tooltip": "If checked, connector tells netsuite exports to export delta data instead of all data export",
          "label": "New Setting after upgrade"
          }
        integration.settings.sections[0].flows.push(data);
        integration.settings.sections[0].fields.push(field);
        that.setIntegration(integration)
          return callback()
        })
      })
    })
  })
}

exports.VersionUpdater = VersionUpdater