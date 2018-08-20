(function () {
    angular
        .module("huskyeats")
        .service("restaurantService", restaurantService);


    function restaurantService($http) {
        this.searchRestaurantByName = searchRestaurantByName;
        this.searchRestaurantById = searchRestaurantById;
        this.searchRestaurantByCuisine = searchRestaurantByCuisine;
        this.getMapImage = getMapImage;
        this.findItemsForRestaurant = findItemsForRestaurant;
        this.findRestaurantForManager = findRestaurantForManager;
        this.addMenu = addMenu;
        this.addItem = addItem;
        this.placeOrder = placeOrder;

        var SERVER_URL = "https://huskyeatsapi.herokuapp.com/";
        var GEO_API_KEY = "AIzaSyDmjkyUIuqFhtjJHInVo848M68jhB4fWxA";

        function searchRestaurantByName(name, lat, lng) {
            var url = "https://developers.zomato.com/api/v2.1/search?q=" + name;
            if(lat != undefined && lng != undefined){
                url = "https://developers.zomato.com/api/v2.1/search?q=" + name+"&lat="+lat+"&lon="+lng;
            }
            return $http.get(url, {headers: {'user-key': '8ba55b6038a3bc12b9d4a30c883964ec'}})
                .then(function (response) {
                return response.data;
            });
        }

        function searchRestaurantByCuisine(cuisineId, lat, lng) {
            var url = "https://developers.zomato.com/api/v2.1/search?cuisines=" + cuisineId;
            if(lat != undefined && lng != undefined){
                url = "https://developers.zomato.com/api/v2.1/search?cuisines=" + cuisineId+"&lat="+lat+"&lon="+lng;
            }
            return $http.get(url, {headers: {'user-key': '8ba55b6038a3bc12b9d4a30c883964ec'}})
                .then(function (response) {
                    return response.data;
                });
        }

        function searchRestaurantById(id) {
            var url = SERVER_URL + "/api/restaurant/" + id;
            return $http.get(url).then(function (response) {
                return response.data;
            });
        }

        function findRestaurantForManager(managerId) {
            return $http.get(SERVER_URL + "/api/restaurant/manager/"+managerId)
                .then(function (response) {
                    return response.data;
                });
        }

        function getMapImage(lat, lng) {
            var url = "https://maps.googleapis.com/maps/api/staticmap?center="+lat+","+lng+"&zoom=15&size=500x500&maptype=roadmap&markers=color:red|"+lat+","+lng+"&key="+GEO_API_KEY;
            return url;
        }
        
        function findItemsForRestaurant(restaurantId) {
            return $http.get(SERVER_URL + "/api/menu/restaurant/"+restaurantId)
                .then(function (response) {
                    return response.data;
                });
        }

        function addMenu(menu, restaurantId) {
            return $http.post(SERVER_URL + "/api/menu/restaurant/"+restaurantId, menu)
                .then(function (response) {
                    return response.data;
                });
        }

        function addItem(item, itemId) {
            return $http.post(SERVER_URL + "/api/item/menu/"+itemId, item)
                .then(function (response) {
                    return response.data;
                });
        }

        function placeOrder(items, userId, restaurantId) {
            return $http.post(SERVER_URL + "/api/order/restaurant/"+restaurantId+"/user/"+userId, items)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();
