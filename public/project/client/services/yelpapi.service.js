(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .factory("YelpAPIService", yelpAPIService);

    function yelpAPIService($http) {

        var api = {
            request_yelp: request_yelp
        };

        return api;

        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
            return result;
        }

        function request_yelp(name) {
                    var method = 'GET';
                    var url = 'http://api.yelp.com/v2/search?callback=JSON_CALLBACK';
                    var params = {
                        callback: 'angular.callbacks._0',
                        location: name,
                        limit : 10,
                        sort: 2,
                        oauth_consumer_key: 'j-Kgx6pccnY0mCsvijWBww', //Consumer Key
                        oauth_token: '_rZOi_LkB62ikZ8eF6MBKU-NwPrHha6v', //Token
                        oauth_signature_method: "HMAC-SHA1",
                        oauth_timestamp: new Date().getTime(),
                        oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
                    };
                    var consumerSecret = 'iwTJ65m5paNf7CG_HLKU7xAJw2w'; //Consumer Secret
                    var tokenSecret = 'kL1vObCNdFETxcJqOZ7o_G6b_tQ'; //Token Secret
                    var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
                    params['oauth_signature'] = signature;

                    return $http.jsonp(url, {params: params});
                }
            }
})();
