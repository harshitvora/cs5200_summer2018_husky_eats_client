(function () {
    angular
        .module("huskyeats")
        .controller("userController", userController);

    function userController($routeParams, $route, userService, restaurantService, reviewService, orderService, $location, $rootScope, user, $cookies) {
        var model = this;

        //Event handles:
        model.logout = logout;
        model.toOrders = toOrders;
        model.toOrder = toOrder;
        model.cancelOrder = cancelOrder;
        model.toFollowing = toFollowing;
        model.toBookmark = toBookmark;
        model.toReview = toReview;
        model.toDeliveries = toDeliveries;
        model.toDelivery = toDelivery;
        model.toAvailableOrders = toAvailableOrders;
        model.deleteReview = deleteReview;
        model.unfollowUser = unfollowUser;
        model.updateStatus = updateStatus;
        model.acceptOrder = acceptOrder;
        model.getMapImage = getMapImage;
        model.addItem = addItem;
        model.addMenu = addMenu;

        var GEO_API_KEY = "AIzaSyDmjkyUIuqFhtjJHInVo848M68jhB4fWxA";

        var userId = user.id;

        function init() {

            userService.findUserByUserId(userId)
                .then(function (response) {
                    model.user = response;
                    if(response.role === "ADMIN"){
                        $location.url("/admin");
                    }
                });

            $rootScope.title = "Your profile";


            if (user.role == 'CUSTOMER') {
                model.currentTab = "ORDERS";
                orderService.findOrdersForCustomer(userId)
                    .then(function (response) {
                        model.orders = response;
                    });
                userService.findFollowingForUser(userId)
                    .then(function (response) {
                        model.following = response;
                    });
            }
            else if (user.role == 'HUSKY') {
                model.currentTab = "AVAILABLE";
                orderService.findAvailableOrders()
                    .then(function (response) {
                        model.availableOrders = response;
                    });
                orderService.findOrdersForHusky(userId)
                    .then(function (response) {
                        model.orders = response;
                    });
            } else if (user.role == 'MANAGER') {
                model.currentTab = "MANAGER";
                restaurantService.findRestaurantForManager(user.id)
                    .then(function (response) {
                        console.log(response);
                        model.restaurant = response;
                        if (response) {
                            model.isManager = true;
                            restaurantService.findItemsForRestaurant(model.restaurant.id)
                                .then(function (response) {
                                    model.menus = response;
                                });
                        }
                    });
            }

            reviewService.findReviewsForUser(userId)
                .then(function (response) {
                    model.review = response.reverse();
                });
        }

        init();

        function logout() {
            $cookies.remove("user");
            $location.url("/login");
        }

        function toFollowing() {
            model.currentTab = "FOLLOWING";
        }

        function toOrders() {
            model.currentTab = "ORDERS";
        }

        function toOrder(order) {
            model.currentTab = "ORDER";
            model.currentOrder = order;

            model.mapUrl = restaurantService.getMapImage(order.restaurant.latitude, order.restaurant.longitude);
            if (order.status != "DELIVERED" && order.status != "CANCELED") {
                model.canCancel = true;
            }
        }

        function cancelOrder() {
            model.currentOrder.status = "CANCELED";
            orderService.updateOrder(model.currentOrder).then(function (response) {
                $route.reload();
            });
        }

        function updateStatus(order, status) {
            order.status = status;
            orderService.updateOrder(order).then(function (response) {
                $route.reload();
            });
        }

        function acceptOrder(order) {
            orderService.acceptOrder(order, userId).then(function (response) {
                console.log(response);
                $route.reload();
            });
        }

        function addMenu(menu) {
            restaurantService.addMenu(menu, model.restaurant.id).then(function (response) {
                console.log(response);
                $route.reload();
            });
        }

        function addItem(item, menuId) {
            console.log(menuId);
            restaurantService.addItem(item, menuId).then(function (response) {
                console.log(response);
                $route.reload();
            });
        }

        function toBookmark() {
            model.currentTab = "BOOKMARK";
        }

        function toReview() {
            model.currentTab = "REVIEW";
        }

        function toDeliveries() {
            model.currentTab = "DELIVERIES";
        }

        function toDelivery(order) {
            model.currentTab = "DELIVERY";
            model.currentOrder = order;
            model.mapUrl = restaurantService.getMapImage(order.restaurant.latitude, order.restaurant.longitude);
            if (order.status != "DELIVERED" && order.status != "CANCELED") {
                model.canCancel = true;
            }
        }

        function toAvailableOrders() {
            model.currentTab = "AVAILABLE";
        }

        function deleteReview(reviewId) {
            reviewService.deleteReview(reviewId)
                .then(function (response) {
                    $route.reload();
                });

        }

        function unfollowUser(followId) {
            userService.unfollowUser(userId, followId)
                .then(function (response) {
                    $route.reload();
                });

        }

        function getMapImage(lat, lng) {
            var url = "https://maps.googleapis.com/maps/api/staticmap?center="+lat+","+lng+"&zoom=15&size=2000x300&maptype=roadmap&markers=color:red|"+lat+","+lng+"&key="+GEO_API_KEY;
            console.log(url)
            return url;
        }
    }
})();
