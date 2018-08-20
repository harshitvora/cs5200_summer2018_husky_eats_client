(function () {
    angular
        .module("huskyeats")
        .controller("userEditController", userEditController);

    function userEditController($routeParams, userService, $location, $rootScope, user, $cookies) {
        let model = this;

        //Event handles:
        model.updateUser = updateUser;
        model.updatePhone = updatePhone;
        model.updateAddress = updateAddress;
        model.updateCard = updateCard;
        model.deleteUser = deleteUser;
        model.logout = logout;

        let userId = user.id;

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
                        if (!response) {
                            model.error = "Error updating profile!";
                        }
                        else {
                            model.successMessage = "Profile updated!";
                            model.alert = "Profile updated!";
                        }
                    });
        }

        function updatePhone(user, phone) {
            userService.updatePhone(user.id, phone)
                .then(function (response) {
                    if (!response) {
                        model.error = "Error updating phone!";
                    }
                    else {
                        model.successMessage = "Phone updated!";
                        //model.alert = "Phone updated!";
                    }
                });
        }

        function updateAddress(user, address) {
            userService.updateAddress(user.id, address)
                .then(function (response) {
                    if (!response) {
                        model.error = "Error updating address!";
                    }
                    else {
                        model.successMessage = "Address updated!";
                        model.alert = "Address updated!";
                    }
                });
        }

        function updateCard(user) {
            userService.updateUser(user.id, user)
                .then(function (response) {
                    if (!response) {
                        model.error = "Error updating card details!";
                    }
                    else {
                        model.successMessage = "Card details updated!";
                        model.alert = "Card details updated!";
                    }
                });
        }

        function deleteUser() {
            userService.deleteUser(userId)
                .then(function (response) {
                    $location.url("/login");
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
