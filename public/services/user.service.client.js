(function () {
    angular
        .module("huskyeats")
        .factory("userService", userService);
    function userService($http) {

        var SERVER_URL = "https://huskyeatsapi.herokuapp.com/";
        var api = {
            "findUserByUserId": findUserByUserId,
            "createUser": createUser,
            "updateUser": updateUser,
            "updatePhone": updatePhone,
            "updateAddress": updateAddress,
            "deleteUser": deleteUser,
            "findFollowingForUser": findFollowingForUser,
            "registerManager": registerManager,
            "followUser": followUser,
            "unfollowUser": unfollowUser,
            "login": login,
            "getAllUsers": getAllUsers,
            "isFollowed": isFollowed
        };
        return api;

        function successCallback(response) {
            return response.data;
        }

        function errorCallback() {
            return null;
        }

        function getAllUsers() {
            return $http.get(SERVER_URL + "/api/user")
                .then(function (response) {
                    return response.data;
                });
        }

        function login(email, password) {
            var url = SERVER_URL + "/api/user/login?email="+email+"&password="+password;
            return $http.get(url)
                .then(successCallback, errorCallback);
        }

        function findUserByUserId(userId) {
            return $http.get(SERVER_URL + "/api/user/"+userId)
                .then(successCallback, errorCallback);
        }

        function createUser(user) {
            var url = SERVER_URL + "/api/user";
            console.log(url);
            return $http.post(url,user)
                .then(successCallback, errorCallback);
        }

        function updateUser(userId, user) {
            var url = SERVER_URL + "/api/user/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePhone(userId, phone) {
            var url = SERVER_URL + "/api/phone/"+userId;
            return $http.post(url, phone)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateAddress(userId, address) {
            var url = SERVER_URL + "/api/address/"+userId;
            return $http.post(url, address)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            return $http.delete({url:SERVER_URL + "/api/user/"+userId, headers:{'Content-Type':'application/json'}})
                .then(function (response) {
                    return response.data;
                });
        }

        function findFollowingForUser(userId) {
            return $http.get(SERVER_URL + "/api/user/"+userId+"/following")
                .then(function (response) {
                    return response.data;
                });

        }

        function registerManager(newUser, vid) {
            return $http.put(SERVER_URL + "/api/user/restaurant/"+vid, newUser)
                .then(function (response) {
                    return response.data;
                });

        }

        function followUser(userId, followId) {
            return $http.put(SERVER_URL + "/api/user/"+userId+"/follow/"+followId)
                .then(function (response) {
                    return response.data;
                });
        }

        function unfollowUser(userId, followId) {
            return $http.delete(SERVER_URL + "/api/user/"+userId+"/follow/"+followId)
                .then(function (response) {
                    return response.data;
                });
        }

        function isFollowed(userId, followId) {
            return $http.get(SERVER_URL + "/api/user/"+userId+"/follow/"+followId)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();