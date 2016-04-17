(function(){
    'use strict';
    angular
        .module("TouristaApp")
        .factory("LocationService", locationService);

    function locationService($http, $templateCache) {

        var service = {
            findLocationByTitle: findLocationByTitle,
            findLocationByID: findLocationByID,
            findTitleByID: findTitleByID,
            findComments: findComments,
            postComment: postComment,
            getCoverImage: getCoverImage,
            findFavoritedUsers : findFavoritedUsers,
            postFavoritedUser : postFavoritedUser,
            deleteComment : deleteComment
        };

        return service;

        function findLocationByTitle(title) {
            return $http({
                method: 'JSONP',
                url: "https://en.wikivoyage.org/w/api.php?action=query&format=json&callback=JSON_CALLBACK&list=allpages&apfrom=".concat(title),
                cache: $templateCache
            });
        }

        var page_id;
        function findLocationByID(id) {
            page_id = id;
            return $http({
                method: 'JSONP',
                url: "https://en.wikivoyage.org/w/api.php?action=query&format=json&callback=JSON_CALLBACK&prop=extracts%7Cimages&pageids=" + id,
                cache: $templateCache
            });

        }

        function findTitleByID(pageid) {
            return $http({
                method: 'JSONP',
                url: "http://en.wikivoyage.org/w/api.php?action=query&format=json&callback=JSON_CALLBACK&prop=info&pageids=" +  pageid,
                cache: $templateCache
            });
        }

        function findComments(locationId) {
            return $http.get('/api/project/location/' + locationId + '/comment');
        }

        function postComment(locationId, comment) {
            return $http.post('/api/project/location/' + locationId + '/comment', comment);
        }

        function getCoverImage(pageid) {
            return $http({
                method: 'JSONP',
                url: "http://en.wikivoyage.org/w/api.php?action=query&format=json&prop=pageimages&callback=JSON_CALLBACK&piprop=thumbnail%7Coriginal&pageids=" +  pageid,
                cache: $templateCache
            });
        }

        function findFavoritedUsers(locationId) {
            return $http.get('/api/project/location/' + locationId + '/favuser');
        }

        function postFavoritedUser(locationId, userId, username) {
            return $http.post('/api/project/location/' + locationId + '/favuser/' + userId + '/' + username);
        }

        function deleteComment(locationId, commentId) {
            return $http.delete('/api/project/location/' + locationId + '/comment/' + commentId);
        }

    }

})();