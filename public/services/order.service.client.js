(function () {
    angular
        .module("huskyeats")
        .service("orderService", orderService);

    function orderService($http) {
        this.findOrdersForCustomer = findOrdersForCustomer;
        this.updateOrder = updateOrder;
        this.acceptOrder = acceptOrder;
        this.findOrdersForHusky = findOrdersForHusky;
        this.findAvailableOrders = findAvailableOrders;

        var SERVER_URL = "https://huskyeatsapi.herokuapp.com/";

        function findOrdersForCustomer(customerId) {
            return $http.get(SERVER_URL + "/api/order/customer/"+customerId)
                .then(function (response) {
                    return response.data;
                });

        }

        function updateOrder(newOrder) {
            return $http.put(SERVER_URL + "/api/order/"+newOrder.id, newOrder)
                .then(function (response) {
                    return response.data;
                });

        }

        function acceptOrder(newOrder, huskyId) {
            return $http.put(SERVER_URL + "/api/order/husky/"+huskyId, newOrder)
                .then(function (response) {
                    return response.data;
                });

        }

        function findOrdersForHusky(huskyId) {
            return $http.get(SERVER_URL + "/api/order/husky/"+huskyId)
                .then(function (response) {
                    return response.data;
                });

        }

        function findAvailableOrders() {
            return $http.get(SERVER_URL + "/api/order/husky/")
                .then(function (response) {
                    return response.data;
                });

        }
    }
})();