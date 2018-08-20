(function () {
    angular
        .module("huskyeats")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, reviewService, $location, $rootScope, $cookies) {
        var model = this;

        //Event handles:
        model.logout = logout;
        model.followUser = followUser;
        model.unfollowUser = unfollowUser;
        model.toReview = toReview;

        var userId = $routeParams["uid"];
        var currentUser;
        var user;

        function init() {
            model.currentTab = "REVIEW";


            model.followed = false;

            currentUser = $cookies.getObject('user');
            if (currentUser != undefined) {
                model.currentUser = currentUser;
                model.loggedin = true;

                if (currentUser.id == userId) {
                    $location.url("/user");
                }

                userService.isFollowed(currentUser.id, userId)
                    .then(function (response) {
                        model.followed = response;
                    });
            }

            userService.findUserByUserId(userId)
                .then(function (response) {
                    user = response;
                    model.user = response;
                    $rootScope.title = response.email + "'s profile";
                });

            reviewService.findReviewsForUser(userId)
                .then(function (response) {
                    model.review = response.reverse();
                });
        }

        init();

        function logout() {
            $cookies.remove("user");
            $location.url("/login");
        }

        function toReview() {
            model.currentTab = "REVIEW";
        }

        function followUser() {
            if (!currentUser) {
                alert("Login to perform this action!");
            } else {
                userService.followUser(currentUser.id, userId)
                    .then(function (response) {
                        model.followed = true;
                    });
            }
        }

        function unfollowUser() {
            userService.unfollowUser(currentUser.id, userId)
                .then(function (response) {
                    model.followed = false;
                });

        }
    }
})();
