'use strict'
 var AbstractEtailConnector = require('abstract-connector').AbstractEtailConnector
  , NetsuiteInstaller = require('./netsuiteInstaller')
  , NETSUITE_CONSTANTS = require('./netsuiteConstants')
  , NetsuiteSettings = require('./netsuiteSettings')
  , NetsuiteHooks = require('./netsuiteHooks')
  , util = require('util')

function NetsuiteConnector() {
 AbstractEtailConnector.call(this)
 this.installer = new NetsuiteInstaller(NETSUITE_CONSTANTS)
 this.hooks = NetsuiteHooks
}

util.inherits(NetsuiteConnector, AbstractEtailConnector)

NetsuiteConnector.prototype.getConnectorConstants = function() {
  return NETSUITE_CONSTANTS
}

NetsuiteConnector.prototype.settings = new NetsuiteSettings()

module.exports = new NetsuiteConnector()
