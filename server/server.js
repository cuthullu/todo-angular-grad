var express = require("express");
var bodyParser = require("body-parser");
var _ = require("underscore");
var fs = require("fs");
var checksum = require("checksum");

module.exports = function(port, persisting, middleware, callback) {
    var actionHistory = [];
    var commandNum = 0;
    var app = express();
    var todos = [];
    var todosChecksum = checksum(JSON.stringify(todos));

    if (middleware) {
        app.use(middleware);
    }
    app.use(express.static("public"));
    app.use(bodyParser.json());


    var latestId = 0;
    function loadData(){
        todos = persisting? require("./db/db.json"): [];
        todosChecksum = checksum(JSON.stringify(todos));
        latestId = todos.length > 0 ? parseInt(todos[todos.length-1].id) + 1 : 0;
    }
    loadData();

    function Action(action, data) {
        this.id = commandNum++;
        this.action = action;
        this.data = data;
        this.logAction = function() {
            actionHistory.push(this);
        };
    }

    function handleDataChange(){
        if(persisting) {
            fs.writeFile("./server/db/db.json", JSON.stringify(todos));
        }

        todosChecksum = checksum(JSON.stringify(todos));
    }

    // Create
    app.post("/api/todo", function(req, res) {
        var todo = req.body;
        todo.id = latestId.toString();
        todo.isComplete = false;
        latestId++;
        todos.push(todo);
        new Action("create", todo).logAction();
        handleDataChange();
        res.set("Location", "/api/todo/" + todo.id);
        res.sendStatus(201);
    });

    // Read
    app.get("/api/todo/:id", function(req, res) {
        var id = req.params.id;
        var todo = getTodo(id);
        if (todo) {
            res.json(todo);
        }else {
            res.sendStatus(404);
        }
    });

    // Read
    app.get("/api/todo", function(req, res) {
        if(req.query.checksum === undefined || req.query.checksum !== todosChecksum){
            res.setHeader("checksum", todosChecksum);
            res.json(todos);
        }else{
            res.sendStatus(204);
        }
    });

    // Delete
    app.delete("/api/todo/:id", function(req, res) {
        var id = req.params.id;
        var todo = getTodo(id);
        if (todo) {
            todos = todos.filter(function(otherTodo) {
                return otherTodo !== todo;
            });
            new Action("delete", {id: id}).logAction();
            handleDataChange();
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    // Update
    app.put("/api/todo/:id", function(req, res) {
        var id  = req.params.id;
        var todo = getTodo(id);
        if (todo) {
            if (req.body.title !== undefined &&  req.body.isComplete !== undefined) {
                todo.title = req.body.title;
                todo.isComplete = req.body.isComplete;
                new Action("update", todo).logAction();
                handleDataChange();
                res.sendStatus(200);
            } else {
                res.set("responseText", "Invalid or incomplete TODO object");
                res.sendStatus(400);
            }
        } else {
            res.sendStatus(404);
        }
    });

    app.put("/api/order", function(req, res) {
        var updates = req.body;
        updates.forEach(function(update){
            todos[update.index] = update.newTodo;
        });
        res.sendStatus(200);
    });

    // Get changes
    app.get("/api/changes", function(req, res) {
        var lastActionID = req.query.lastActionID !== undefined ? req.query.lastActionID : 0;
        var changes = actionHistory.filter(function(action) {return action.id >= lastActionID;});
        res.json(changes);
    });

    function getTodo(id) {
        return _.find(todos, function(todo) {
            return todo.id === id;
        });
    }

    var server = app.listen(port, callback);

    // We manually manage the connections to ensure that they're closed when calling close().
    var connections = [];
    server.on("connection", function(connection) {
        connections.push(connection);
    });

    return {
        close: function(callback) {//assada
            connections.forEach(function(connection) {
                connection.destroy();
            });
            server.close(callback);
        },
        persist: function(){
            persisting = true;
            loadData();

        }
    };
};
