(function () {
    angular
        .module("huskyeats")
        .controller("searchController", searchController);

    function searchController(userService, restaurantService, $rootScope, $location, $cookies) {
        let model = this;

        model.newSearchRestaurantByName = newSearchRestaurantByName;
        model.newSearchRestaurantByCuisine = newSearchRestaurantByCuisine;
        model.searchRestaurantByName = searchRestaurantByName;
        model.searchRestaurantByCuisine = searchRestaurantByCuisine;


        let currentUser;

        function init() {

            if($location.search().type === "name"){
                searchRestaurantByName($location.search().name);
                $rootScope.name = $location.search().name;
            } else if($location.search().type === "cuisine"){
                searchRestaurantByCuisine($location.search().cuisineId);
            }

            currentUser = $cookies.getObject('user');
            if(currentUser != undefined){
                model.currentUser = currentUser;
            }

            $rootScope.title = "Search";

        }

        init();

        function newSearchRestaurantByName(name) {
            // $rootScope.location = location;
            $rootScope.name = name;
            $location.url("/search?type=name&name="+name);
        }

        function newSearchRestaurantByCuisine(cuisineId) {
            $rootScope.cuisineId = cuisineId;
            $location.url("/search?type=cusisine&cuisineId="+cuisineId);
        }


        function searchRestaurantByName(name) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                restaurantService.searchRestaurantByName(name, lat, lng)
                    .then(function (response) {
                        $rootScope.result = response;
                    })
            })
        }

        function searchRestaurantByCuisine(cuisineId) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                restaurantService.searchRestaurantByCuisine(cuisineId, lat, lng)
                    .then(function (response) {
                        $rootScope.result = response;
                    });
            })
        }
    }
})();