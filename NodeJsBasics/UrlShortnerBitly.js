const { BitlyClient } = require('bitly');
urlMap = {};
var _ = require('lodash');

function UrlShortner() {
    let _accessToken = "ac976f2fdc16a5ca21b4e3fff7a7b19f767dd15a";
    const bitly = new BitlyClient(_accessToken, {});

    async function _getShortenedUrl(actualUrl, callback) {
        if(urlMap[actualUrl]) {
            console.log("Returning url from cache");
            callback({"url" :urlMap[actualUrl]});
            return;
        }
        let result;
        try {
            result = await bitly.shorten(actualUrl);
            if(result.url) {
                result = result.url;
                urlMap[actualUrl] = result;
                console.log("Returning url from bitly server");
                callback({"url" : result});
            }

        } catch(e) {
            console.log("Error in shortening url using bitly : "+e.toString());
            callback({"error" : e.toString()});
        }
    }

    /**
     * Shorten the url.
     *
     * @param {String} url
     * @param {Function} callback
     */
    this.getShortenedUrl = function(actualUrl, callback) {
        _getShortenedUrl.call(this, actualUrl, callback);
    }

    /**
     * returns list of mapped urls
     *
     * @param {Array} list
     * @param {Function} callback
     */
    this.getListOfShortenedUrls = function (list, callback) {
        let counter = 0;
        let result = new Array();
        _.each(list, function (item) {
            _getShortenedUrl.call(this, item, function (res) {
                counter ++;
                result.push(res);
                if(counter == list.length) {
                    callback(result);
                }
            });
        })
    }
}

/**
 * Expose `UrlShortner` class.
 */

module.exports = UrlShortner;