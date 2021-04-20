TodoMVC.module('TodoList', function(TodoList, App, Backbone, Marionette, $, _) {
    // TodoList Router
    // ---------------
    // 완료된 Todo 항목 대비 활성화된 항목을 보여주기 위해 경로를 처리한다.
    TodoList.Router = Marionette.AppRouter.extend({
        appRoutes: {
            '*filter': 'filterItems'
        }
    });
    // TodoList Controller(Mediator, 중재자)
    // ------------------------------------
    // 뷰와 모듈의 상세한 구현체 위에서 애플리케이션의 워크플로우와 로직을 제어한다.
    TodoList.Controller = function() {
        this.todoList = new App.Todos.TodoList();
    };
    _.extend(TodoList.Controller.prototype, {
        // 가능하다면 todo 항목의 목록을 가지고 와서 적절한 뷰에 출력한 상태로 앱을 시작한다.
        start: function() {
            this.showHeader(this.todoList);
            this.showFooter(this.todoList);
            this.showTodoList(this.todoList);
            App.bindTo(this.todoList, 'reset add remove', this.toggleFooter, this);
            this.todoList.fetch();
        },
        showHeader: function(todoList) {
            var header = new App.Layout.Header({
                collection: todoList
            });
            App.header.show(header);
        },
        showFooter: function(todoList) {
            var footer = new App.Layout.Footer({
                collection: todoList
            });
            App.footer.show(footer);
        },
        showTodoList: function(todoList) {
            App.main.show(new TodoList.Views.ListView({
                collection: todoList
            }));
        },
        toggleFooter: function() {
            App.footer.$el.toggle(true);
        },
        // 완료된 Todo 항목 대비 활성화된 항목을 보여주기 위해 경로를 처리한다.
        filterItems: function(filter) {
            App.vent.trigger('todoList:filter', filter.trim() || '');
        }
    });
    // TodoList 초기화, Initializer
    // ---------------------------
    // 기존 todo 항목들을 가져와서 보여주고, 앞의 애플리케이션을 시작할 때 중재자를 초기화하여 TodoList를 가지고 온 뒤 실행한다.
    TodoList.addInitializer(function() {
        var controller = new TodoList.Controller();
        new TodoList.Router({
            controller: controller
        });
        controller.start();
    });
});