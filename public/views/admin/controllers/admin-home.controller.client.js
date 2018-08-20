(function () {
    angular
        .module("huskyeats")
        .controller("adminHomeController", adminHomeController);

    function adminHomeController($routeParams, $route, userService, restaurantService, reviewService, $location, $rootScope, user, $cookies) {
        let model = this;

        //Event handles:
        model.logout = logout;
        model.deleteUser = deleteUser;

        let userId = user.id;
        function init() {

            userService.findUserByUserId(userId)
                .then(function (user) {
                    model.user = user;
                    userService.getAllUsers()
                        .then(function (response) {
                            model.users = response;
                        });
                });

            $rootScope.title = "Admin";

        }
        init();

        function logout() {
            $cookies.remove("user");
            $location.url("/login");
        }

        function deleteUser(userId) {
            userService.deleteUser(userId)
                .then(function (response) {
                    $route.reload();
                });

        }
    }
})();

