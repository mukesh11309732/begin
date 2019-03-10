var XMLParserHelper = require('./XMLParserHelper');
var GenerateXMLHelper = require('./GenerateXMLHelper');
var Gpage = require('./saveGPage');

function testGetJSONFromXml() {
    var sampleXMl = "<products>\n" +
        "    <product>\n" +
        "        <baseId></baseId>\n" +
        "        <isActive></isActive>\n" +
        "        <contentType>\n" +
        "            <contentTypeValue></contentTypeValue>\n" +
        "        </contentType>\n" +
        "        <features>\n" +
        "            <feature></feature>\n" +
        "        </features>\n" +
        "        <searchTerms>\n" +
        "            <searchTermValue></searchTermValue>\n" +
        "        </searchTerms>\n" +
        "        <childProducts>\n" +
        "            <childProduct>\n" +
        "                <baseId></baseId>\n" +
        "                <isActive></isActive>\n" +
        "                <features>\n" +
        "                    <feature></feature>\n" +
        "                </features>\n" +
        "                <searchTerms>\n" +
        "                    <searchTermValue></searchTermValue>\n" +
        "                </searchTerms>\n" +
        "            </childProduct>\n" +
        "            <childProduct>\n" +
        "                <baseId></baseId>\n" +
        "                <isActive></isActive>\n" +
        "                <features>\n" +
        "                    <feature></feature>\n" +
        "                </features>\n" +
        "                <searchTerms>\n" +
        "                    <searchTermValue></searchTermValue>\n" +
        "                </searchTerms>\n" +
        "            </childProduct>\n" +
        "            <childProduct>\n" +
        "                <baseId></baseId>\n" +
        "                <isActive></isActive>\n" +
        "                <features>\n" +
        "                    <feature></feature>\n" +
        "                </features>\n" +
        "                <searchTerms>\n" +
        "                    <searchTermValue></searchTermValue>\n" +
        "                </searchTerms>\n" +
        "            </childProduct>\n" +
        "        </childProducts>\n" +
        "    </product>\n" +
        "</products>";
    var xmlParser = new XMLParserHelper();
    var jsonObj = xmlParser.getJSONFromXml(sampleXMl);
    console.log("GetJSONFromXml : "+JSON.stringify(jsonObj));
}

function testGetJSONFromXMLFile() {
    var filepath = "./sampleXML.xml";
    var xmlParser = new XMLParserHelper();
    var jsonObj = xmlParser.getJSONFromXMLFile(filepath);
    console.log("GetJSONFromXMLFile : "+JSON.stringify(jsonObj));
}

function testGenerateXML() {
    var generateXMLObj = new GenerateXMLHelper();
    var xml = generateXMLObj.generateXML();
    console.log("GenerateXML : "+xml);
}

function testDownloadAndSaveGPage() {
    Gpage.downloadAndSaveGPage();
}

module.exports.testGetJSONFromXml = testGetJSONFromXml;
module.exports.testGetJSONFromXMLFile = testGetJSONFromXMLFile;
module.exports.testGenerateXML = testGenerateXML;
module.exports.testDownloadAndSaveGPage = testDownloadAndSaveGPage;