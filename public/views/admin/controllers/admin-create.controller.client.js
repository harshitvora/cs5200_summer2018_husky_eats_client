(function () {
    angular
        .module("huskyeats")
        .controller("adminCreateController", adminCreateController);

    function adminCreateController($location, userService, $rootScope) {
        let model = this;

        //Event handles:
        model.register = register;
        model.logout = logout;

        function init() {
            $rootScope.title = "Register";
        }

        init();

        function register(user) {
            if (user === undefined ||
                user.password === undefined ||
                user.email === undefined ||
                user.verifyPassword === undefined ||
                user.firstName === undefined ||
                user.lastName === undefined) {
                model.errorMessage = "Enter all fields!";
            } else {
                if (user.password === user.verifyPassword) {
                    var newUser = {
                        email: user.email,
                        password: user.password,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        pictureUrl: "../../../uploads/profile.jpg"
                    };
                    userService.createUser(newUser)
                        .then(function (response) {
                            if (!response) {
                                model.error = "User already exists!";
                            }
                            else {
                                newUser = response;
                                $location.url("/admin");
                            }
                            return;
                        });
                }
                else {
                    model.error = "Passwords do not match!";
                }
            }
        }

        function logout() {
            if ($rootScope.currentUser) {
                delete $rootScope.currentUser;
            }
            $location.url("/login");
        }

    }
})();
