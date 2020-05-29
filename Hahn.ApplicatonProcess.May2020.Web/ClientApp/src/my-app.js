var MyApp = (function () {
    function MyApp() {
        this.message = 'Hello World!';
        this.todos = [];
        this.heading = 'Todos';
        this.todos = [];
        this.todoDescription = '';
    }
    MyApp.prototype.addTodo = function () {
        if (this.todoDescription) {
            this.todos.push({
                description: this.todoDescription,
                done: false
            });
            this.todoDescription = '';
        }
    };
    MyApp.prototype.removeTodo = function (todo) {
        var index = this.todos.indexOf(todo);
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
    };
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=my-app.js.map