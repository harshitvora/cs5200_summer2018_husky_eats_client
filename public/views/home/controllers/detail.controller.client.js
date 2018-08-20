(function () {
    angular
        .module("huskyeats")
        .controller("detailController", detailController);

    function detailController($rootScope, $routeParams, restaurantService, userService, reviewService, $location, $route, $cookies) {
        let model = this;

        //Event handles:
        model.logout = logout;
        model.createReview = createReview;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;
        model.toMenu = toMenu;
        model.toReview = toReview;
        model.registerManager = registerManager;
        model.addToCart = addToCart;
        model.placeOrder = placeOrder;

        let vid = $routeParams["vid"];
        let currentUser;
        let restaurant;
        let lat;
        let lng;

        function init() {
            model.vid = vid;
            model.isManager = false;

            model.currentTab = "MENU";

            restaurantService.searchRestaurantById(vid).then(function (response) {
                restaurant = response;
                lat = restaurant.latitude;
                lng = restaurant.longitude;
                model.mapUrl = restaurantService.getMapImage(lat, lng);
                model.restaurant = restaurant;
                $rootScope.title = restaurant.name;
                model.cart = [];

                currentUser = $cookies.getObject('user');
                if (currentUser != undefined) {
                    model.user = currentUser;
                    model.loggedin = true;

                    if (restaurant.manager != undefined && restaurant.manager.id == currentUser.id) {
                        model.isManager = true;
                    }
                }
            });

            restaurantService.findItemsForRestaurant(vid).then(function (response) {
                model.menuItems = response;
            });

            reviewService.findReviewsForRestaurant(vid).then(function (response) {
                model.reviews = response.reverse();
            });
        }

        init();

        function logout() {
            $cookies.remove("user");
            model.currentUser = "";
            model.loggedin = false;
            $route.reload();
        }

        function toMenu() {
            model.currentTab = "MENU";
        }

        function toReview() {
            model.currentTab = "REVIEW";
        }

        function registerManager() {
            userService.registerManager(currentUser, vid).then(function (response) {
                model.isManager = true;
                $route.reload();
            });
        }

        function addToCart(item) {
            model.cart.push(item);
        }

        function placeOrder() {
            restaurantService.placeOrder(model.cart, currentUser.id, vid).then(function (response) {
                $location.url("user/");
            });
        }

        function createReview(review) {
            if (review === undefined || review.title === undefined || review.text === undefined || review.rating === undefined) {
                model.errorMessage = "Enter all fields!";
            } else {
                reviewService.createReview(review, currentUser.id, vid).then(function (response) {
                    $route.reload();
                });
            }
        }

        function updateReview(review) {
            reviewService.updateReview(review._id, review).then(function (response) {
                $route.reload();
            });
        }

        function deleteReview(id) {
            reviewService.deleteReview(id).then(function (response) {
                $route.reload();
            });
        }
    }
})();
