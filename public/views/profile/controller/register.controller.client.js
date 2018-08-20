(function () {
    angular
        .module("huskyeats")
        .controller("registerController", registerController)

    function registerController($location, userService, $rootScope, $cookies) {
        var model = this;

        //Event handles:
        model.register = register;

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
                                login(user);
                            }
                            return;
                        });
                }
                else {
                    model.error = "Passwords do not match!";
                }
            }
        }

        function login(user) {
            userService.login(user.email, user.password)
                .then(function (response) {
                    var _user = response;
                    if (!_user) {
                        model.errorMessage = "Wrong email or password!";
                    }
                    else {
                        $cookies.putObject('user', _user);
                        $rootScope.currentUser = _user;
                        $location.url("user/");
                    }
                });

        }
    }
})();
