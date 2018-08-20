(function () {
    angular.module("huskyeats")
        .controller("homeController", homeController);

    function homeController($location, $rootScope, userService, restaurantService, $route, $cookies) {
        var model = this;

        // Event handles:
        model.logout = logout;
        model.toggleSearch = toggleSearch;
        model.searchRestaurantByCuisine = searchRestaurantByCuisine;
        model.searchRestaurantByName = searchRestaurantByName;

        var currentUser;
        var toggle = "name";

        function init() {

            $rootScope.toggle = toggle;

            currentUser = $cookies.getObject('user');
            if (currentUser != undefined) {
                model.currentUser = currentUser;
            }

            $rootScope.title = "HuskyEats";
        }

        init();

        function logout() {
            $cookies.remove("user");
            model.currentUser = "";
            $route.reload();
        }

        function toggleSearch() {
            if (toggle == "name") {
                toggle = "location";
                $rootScope.toggle = toggle;
            } else {
                toggle = "name";
                $rootScope.toggle = toggle;
            }


        }

        function searchRestaurantByName(name) {
            // $rootScope.location = location;
            $rootScope.name = name;
            $location.url("/search?type=name&name=" + name);
        }

        function searchRestaurantByCuisine(cuisineId) {
            $rootScope.cuisineId = cuisineId;
            $location.url("/search?type=cuisine&cuisineId=" + cuisineId);
        }
    }
})();