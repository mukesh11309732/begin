var fs = require('fs');
var parse = require('xml-parser');

function XMLParserHelper() {

    /**
     * Parse the given string of `xml`.
     *
     * @param {String} xml
     * @return {Object}
     */
    this.getJSONFromXml = function (xml) {
        try {
            return parse(xml);
        } catch(ex) {
            console.log("Please provide valid xml string input : "+ex.toString());
        }
    }

    /**
     * Parse the xml from filepath.
     *
     * @param {String} xml
     * @return {Object}
     */
    this.getJSONFromXMLFile = function (filepath) {
        try {
            var xml = fs.readFileSync(filepath, 'utf8');
            return parse(xml);
        }catch(ex) {
            if(ex.code && ex.code == "ENOENT") {
                console.log("File does not exists. Please provide a valid filepath");
            } else {
                console.log("Something went wrong. Please provide a valid filepath containing xml");
            }
        }
    }
}

/**
 * Expose `XMLParserHelper` class.
 */

module.exports = XMLParserHelper;

