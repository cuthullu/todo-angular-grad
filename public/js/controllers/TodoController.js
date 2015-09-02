(function () {
    angular.module("TodoApp").controller("TodoController", TodoController);

    function TodoController($http, $rootScope, $filter, $localStorage, $scope, todoService) {
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

        vm.todoCompleteDeleted = function(){
            $filter("filter")(vm.items, {isComplete: true}).forEach(vm.todoDeleted);
        };

        function getTodoList() {
            if ($localStorage.items !== undefined) {
                vm.items = $localStorage.items;
            }
            reloadTodoList();
        }

        function reloadTodoList() {
            todoService.getTodoList().success(function (data) {
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

                $localStorage.items = vm.items;
            });
        }

        function handleError(event, text, status) {
            vm.error = "Failed to do action. Server returned " + status + " - " + text;
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
        getTodoList();
    }
})();
