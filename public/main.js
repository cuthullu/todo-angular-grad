/*global angular*/
(function() {
    var app = angular.module("TodoApp", []);

    app.controller("TodoController", function($scope, $http) {
        $http.defaults.transformRequest.push(function(config) {
            $scope.loading = true;
            return config;
        });
        $http.defaults.transformResponse.push(function(response) {
            $scope.loading = false;
            return response;
        });

        $scope.loading = false;
        $scope.items = [];

        $scope.submitForm = function() {
            createTodo($scope.newTodo).then(reloadTodoList);
            $scope.newTodo = "";
        };

        function createTodo(title) {
            return $http.post("/api/todo", {
                title: title
            }).then(null, function(result) {
                $scope.error = "Failed to create item. Server returned " + result.status + " - " + result.data;
            });
        }

        function getTodoList() {
            return $http.get("/api/todo").then(function(result) {
                return result.data;
            });
        }

        function reloadTodoList() {
            getTodoList().then(function(items) {
                $scope.items = items;
            }, function(result) {
                $scope.error = "Failed to get list. Server returned " + result.status + " - " + result.data;
            });
        }

        reloadTodoList();
    });
})();
