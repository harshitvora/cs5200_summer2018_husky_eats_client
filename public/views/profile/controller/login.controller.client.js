(function () {
    angular
        .module("huskyeats")
        .controller("loginController", loginController);

    function loginController($location, userService, $rootScope, $cookies) {
        var model = this;

        //Event handles:
        model.login = login;

        function init() {
            $rootScope.title = "Login";
        }
        init();

        function login(user) {
            if(user === undefined || user.email === undefined || user.password === undefined){
                model.errorMessage = "Enter all fields!";
            } else {
                userService.login(user.email, user.password)
                    .then(function (response) {
                        var _user = response;
                        if(!_user){
                            model.errorMessage = "Wrong email or password!";
                        }
                        else {
                            $cookies.putObject('user', _user);
                            if(_user.role === "ADMIN"){
                                $location.url("admin/");
                            } else {
                                $rootScope.currentUser = _user;
                                $location.url("user/");
                            }
                        }
                    });
            }
        }
    }
})();
