(function () {
    angular
        .module("huskyeats")
        .controller("adminEditController", adminEditController);

    function adminEditController($routeParams, userService, $location, $rootScope, user, $cookies) {
        let model = this;

        //Event handles:
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        let userId = $routeParams["uid"];

        function init() {
            userService.findUserByUserId(userId)
                .then(function (response) {
                    model.user = response;
                });
            $rootScope.title = "Edit Profile";
        }
        init();

        function updateUser(user) {
            userService.updateUser(user.id, user)
                .then(function (response) {
                    if(!response){
                        model.error = "Error updating profile!";
                    }
                    else{
                        model.successMessage = "Profile updated!";
                        $location.url("/admin");
                    }
                });
        }

        function deleteUser(userId) {
            userService.deleteUser(userId)
                .then(function (response) {
                    $location.url("/admin");
                });
        }

        function logout() {
            if($rootScope.currentUser){
                delete $rootScope.currentUser;
            }
            $cookies.remove("user");
            $location.url("/login");
        }
    }
})();

