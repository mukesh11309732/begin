function MetadataParser(version, channel, keyField) {
	var _version = version;
	var _channel = channel;
	var _keyField = keyField;
	
	this.getVersion = function() {
		return _version;
	}
	
	this.setVersion = function(version) {
		_version = version;
	}
	
	this.getChannel = function() {
		return _channel;
	}
	
	this.setChannel = function(channel) {
		_channel = channel;
	}
	
	this.getKeyField = function() {
		return _keyField;
	}
	
	this.setKeyField = function(keyField) {
		_keyField = keyField;
	}
	
	this.groupObjectsBy = function(inputJsonArray, key) {
		return _.groupBy(inputJsonArray, key);
	}
}

