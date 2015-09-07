(function () {
    angular.module("TodoApp").factory("errorService", errorService);

    function errorService($rootScope) {
        var service = {
            broadcast: broadcastError
        };
        return service;

        //////////////////
        function convert(method){
            switch (method.toUpperCase()){
                case "POST": return "create";
                case "GET": return "read";
                case "PUT": return "update";
                case "DELETE": return "delete";
            }
        }

        function broadcastError(text, status, x,req) {
            var reqAction = convert(req.method);

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