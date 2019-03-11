var request = require('request');
var fs = require('fs');
var _ = require('lodash');
var UrlShortner = require('./UrlShortnerBitly');

var images = [
    {"1": "https://homepages.cae.wisc.edu/~ece533/images/monarch.png"},
    {"2": "https://doodleart.redbull.com/assets/managed/entries/processed/sm/367010617181759_36211000.jpg"},
    {"3": "https://homepages.cae.wisc.edu/~ece533/images/airplane.png"},
    {"4": "https://homepages.cae.wisc.edu/~ece533/images/arctichare.png"},
    {"5": "https://homepages.cae.wisc.edu/~ece533/images/baboon.png"},
    {"6": "https://homepages.cae.wisc.edu/~ece533/images/boat.png"},
    {"7": "https://homepages.cae.wisc.edu/~ece533/images/cat.png"},
    {"8": "https://homepages.cae.wisc.edu/~ece533/images/fruits.png"},
    {"9": "https://homepages.cae.wisc.edu/~ece533/images/frymire.png"},
    {"10": "https://homepages.cae.wisc.edu/~ece533/images/girl.png"},
];

module.exports = {
    /**
     * Public API to download images parallely
     */
    downloadImagesAsync : function() {

        console.log(" ------------------------------------------- ");
        console.log(" ------ Downloading images parallely ------- ");
        console.log(" ------------------------------------------- ");

        try {
            fs.mkdirSync('./stream');
        } catch (e) {
            //Ignore Exception of folder already created
        }
        var path = './stream/temp_' + _.now();
        fs.mkdirSync(path);
        _.each(images, function (image) {
            var key = Object.keys(image)[0];
            var filepath = path + '/' + key + '.png';
            var writer = fs.createWriteStream(filepath);

            writer.on('pipe', function (src) {
                console.log(" starting writing for image : "+key);
            });

            request(image[key]).pipe(writer);

            writer.on('finish', function () {
                console.log(" finish writing for image : "+key);
            });
        });
    },

    getListOfUrls : function () {
        let urlObj = new UrlShortner();
        var imgArr = new Array();
        _.each(images, function (image) {
            var key  = Object.keys(image)[0];
            imgArr.push(image[key]);
        });
        urlObj.getListOfShortenedUrls(imgArr, function (res) {
            _.each(res, function (url) {
                console.log(url);
            })
        })
    }
}