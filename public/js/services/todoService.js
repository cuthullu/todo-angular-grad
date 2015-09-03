(function() {
    angular.module("TodoApp").factory("todoService", TodoService);

    function TodoService($http, $rootScope, $interval, $localStorage, methodToAction){
        var service = {
            createTodo : createTodo,
            getTodoList: getTodoList,
            updateTodo: updateTodo,
            deleteTodo: deleteTodo
        };
        var checksum = "notAChecksum";
        var items = [];

        $interval(pollTodoList, 1000);
        pollTodoList();
        return service;

        ///////////////////////

        function createTodo(title) {
            return $http.post("/api/todo", {
                title: title
            }).success(pollTodoList).error(broadcastError);
        }

        function getTodoList(){
            return items;
        }

        function pollTodoList() {
            return $http.get("/api/todo?checksum=" + checksum).success(function (data,status, headers) {
                if(status === 200){
                    items = data;
                    checksum = headers("checksum");
                    $localStorage.items = items;
                    $localStorage.checksum = checksum;
                    broadcastChange(items);
                }
            }).error(broadcastError);
        }

        function updateTodo(todo) {
            return $http.put("/api/todo/" + todo.id, todo).success(pollTodoList).error(broadcastError);
        }

        function deleteTodo(todoId) {
            return $http.delete("/api/todo/" + todoId).success(pollTodoList).error(broadcastError);
        }

        function broadcastChange(data) {
            $rootScope.$broadcast("todosChanged");
            return data;
        }

        function broadcastError(text, status, x,req) {
            var reqAction = methodToAction.convert(req.method);

            var reqOb;
            if(req.url.indexOf("?") > 0){
                reqOb = req.url.substring(req.url.lastIndexOf("/") + 1,req.url.indexOf("?"));
            }else{
                reqOb = req.url.substring(req.url.lastIndexOf("/") + 1);
            }

            reqOb = reqOb === "todo"? "todos": "todo " + reqOb;

            $rootScope.$broadcast("errorResponse", text, status, reqAction, reqOb);
        }

    }

})();
