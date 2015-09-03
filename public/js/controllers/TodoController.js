(function () {
    angular.module("TodoApp").controller("TodoController", TodoController);

    function TodoController($http, $rootScope, $mdToast, $filter, $scope, todoService) {
        var vm = this;
        var deregisters = [];
        $http.defaults.transformRequest.push(function (config) {
            vm.loading = true;
            return config;
        });
        $http.defaults.transformResponse.push(function (response) {
            vm.loading = false;
            return response;
        });

        deregisters.push($rootScope.$on("todosChanged", reloadTodoList));
        deregisters.push($rootScope.$on("errorResponse", handleError));
        $scope.$on("$destroy", destroyThis);

        vm.loading = false;
        vm.items = [];


        vm.sortableOptions = {
            placeholder: "app",
            activate: function (x, y) {
                y.item.addClass("dragging");
            },
            deactivate: function (x, y) {
                y.item.removeClass("dragging");
            },
        };

        vm.submitForm = function () {
            /** @namespace vm.newTodoForm */
            if (vm.newTodoForm.$valid) {
                todoService.createTodo(vm.newTodo);
                vm.newTodo = "";
            }
        };

        vm.todoUpdated = function (todo) {
            todoService.updateTodo(todo);
        };

        vm.todoDeleted = function (todo) {
            todoService.deleteTodo(todo.id);
        };

        vm.todoCompleteDeleted = function () {
            $filter("filter")(vm.items, {isComplete: true}).forEach(vm.todoDeleted);
        };

        function reloadTodoList() {

            var data = todoService.getTodoList();
            data.forEach(function (newTodo) {
                if ($filter("filter")(vm.items, newTodo).length > 0) {
                    //   do nothing, it there and it matches
                } else if ($filter("filter")(vm.items, {id: newTodo.id}).length > 0) {
                    var oldTodo = $filter("filter")(vm.items, {id: newTodo.id})[0];
                    var index = vm.items.indexOf(oldTodo);
                    vm.items[index] = newTodo;
                } else {
                    vm.items.push(newTodo);
                }

            });
            vm.items = vm.items.filter(function (oldTodo) {
                return $filter("filter")(data, {id: oldTodo.id}).length > 0;
            });
        }

        function handleError(event, errorText, errorStatus, requestAction, requestOb) {
            vm.error = "Failed to " + requestAction + " " + requestOb + ". Server returned " + errorStatus + " - " + errorText;
            $mdToast.show($mdToast.simple().content(vm.error));
        }

        function destroyThis() {
            deregisters.forEach(function (eventDereg) {
                eventDereg();
            });
        }

        vm.onDropComplete = function (index, obj) {
            var otherObj = vm.items[index];
            var otherIndex = vm.items.indexOf(obj);
            vm.items[index] = obj;
            vm.items[otherIndex] = otherObj;
        };
    }
})();
