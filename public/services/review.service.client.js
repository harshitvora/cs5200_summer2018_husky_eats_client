(function () {
    angular
        .module("huskyeats")
        .service("reviewService", reviewService);

    function reviewService($http) {
        this.createReview = createReview;
        this.deleteReview = deleteReview;
        this.findReviewsForRestaurant = findReviewsForRestaurant;
        this.findReviewsForUser = findReviewsForUser;

        var SERVER_URL = "https://huskyeatsapi.herokuapp.com/";

        function createReview(review, customerId, restaurantId) {
            var url = SERVER_URL + "/api/review?cid=" + customerId + "&rid=" + restaurantId;
            return $http.post(url, review)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteReview(reviewId) {
            return $http.delete(SERVER_URL + "/api/review/" + reviewId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findReviewsForUser(userId) {
            return $http.get(SERVER_URL + "/api/review/user/" + userId)
                .then(function (response) {
                    return response.data;
                });

        }

        function findReviewsForRestaurant(restaurantId) {
            return $http.get(SERVER_URL + "/api/review/restaurant/" + restaurantId)
                .then(function (response) {
                    return response.data;
                });

        }
    }
})();