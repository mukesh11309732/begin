var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Server is up and running!');
}).listen(8999);


/*
*use the following snippet to test the APIs
*
 */

var tests = require('./tests');

tests.testGetJSONFromXml();
tests.testGetJSONFromXMLFile();
tests.testGenerateXML();
tests.testDownloadAndSaveGPage();
tests.testDownloadImagesAsync();
tests.testGetShortenedUrl();
