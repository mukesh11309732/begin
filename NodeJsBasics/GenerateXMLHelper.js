var handlebars = require('handlebars');
var fs = require('fs');

function GenerateXMLHelper() {
    /**
     * Generate XML from xml template and data using handlebars
     *
     * @param {String} xml filepath
     * @return {string}
     */
    this.generateXML = function () {
        try {
            var filepath = "./xml-template.xml";
            var xml = fs.readFileSync(filepath, 'utf8');
            var data = {
                "products": [{
                    "baseId": "1",
                    "feature": {
                        "1": "parent",
                        "2": "first entry"
                    },
                    "contentType": {
                        "1": {
                            "value": "pure"
                        },
                        "2": {
                            "value": "mix"
                        }
                    },
                    "isActive": true,
                    "childProducts": [{
                        "baseId": "1-1",
                        "isActive": true
                    }, {
                        "baseId": "1-2",
                        "isActive": false
                    }, {
                        "baseId": "1-3",
                        "isActive": true
                    }, {
                        "baseId": "1-4",
                        "isActive": true,
                        "feature": {
                            "1": "parent",
                            "2": "first entry"
                        },
                        "searchTerms": {
                            "0": "glue",
                            "1": "adhesive",
                            "2": "stick"
                        }
                    }]
                }, {
                    "baseId": "10",
                    "isActive": true,
                    "searchTerms": {
                        "0": "glue",
                        "1": "adhesive",
                        "2": "stick"
                    },
                    "childProducts": [{
                        "baseId": "10-1",
                        "isActive": true,
                        "searchTerms": {
                            "0": "glue"
                        }
                    }, {
                        "baseId": "10-2",
                        "isActive": false
                    }, {
                        "baseId": "10-3",
                        "isActive": true
                    }, {
                        "baseId": "10-4",
                        "isActive": true
                    }]
                }]
            };

            var template = handlebars.compile(xml);
            return template(data);

        } catch (ex) {
            console.log("Something went wrong in parsing the template : " + ex.toString());
        }
    }
}


/**
 * Expose `XMLParserHelper` class.
 */

module.exports = GenerateXMLHelper;