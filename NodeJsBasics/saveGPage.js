var request = require('request');
var fs = require('fs');
var _ = require('lodash');

module.exports = {
    /**
     * Public API to download and save google homepage
     */
    downloadAndSaveGPage : function() {
        var Gurl = "https://www.google.com";
        request.get(Gurl, function (err, res, body) {
            if(err) {
                console.log("Error in downloading google homepage : "+JSON.stringify(err));

            } else if(res.statusCode == 200) {
                try {
                    fs.mkdirSync('./temp');
                } catch (e) {
                    //Ignore Exception of folder already created
                }

                var path = './temp/GPage_' + _.now() + '.html';
                fs.writeFile(path, body, function(err) {
                    if(err) {
                        console.log("Error in writing file into directory : "+ path +" Error : "+JSON.stringify(err));
                    } else {
                        console.log("Successfully created file : "+path);
                    }

                })

            } else {
                console.log("Status code is not 200");
            }
        });
    }
}