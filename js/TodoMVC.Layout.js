TodoMVC.module('Layout', function(Layout, App, Backbone, Marionette, $, _) {
    // header view layout
    // ------------------
    Layout.Header = Backbone.Marionette.ItemView.extend({
        template: '#template-header',
        // UI 바인딩을 통해 jQuery 셀렉터로 선택된 객체를 지정하는 속성을 캐시할 수 있다.
        ui: {
            input: '#new-todo'
        },
        events: {
            'keypress #new-todo': 'onInputKeypress'
        },
        onTodoBlur: function() {
            var todoText = this.ui.input.val().trim();
            this.createTodo(todoText);
        },
        onInputKeypress: function(e) {
            var ENTER_KEY = 13;
            var todoText = this.ui.input.val().trim();
            if ( e.which === ENTER_KEY && todoText ) {
                this.createTodo(todoText);
            }
        },
        completeAdd: function(){
            this.ui.input.val('');
        },
        createTodo: function(todoText){
            if (todoText.trim() === ""){ return; }
            this.collection.create({
                title: todoText
            });
            this.completeAdd();
        }
    });
    // footer view layout
    // ------------------
    Layout.Footer = Backbone.Marionette.Layout.extend({
        template: '#template-footer',
        // UI 바인딩을 통해 jQuery 셀렉터로 선택된 객체를 지정하는 속성을 캐시할 수 있다.
        ui: {
            todoCount: '#todo-count .count',
            todoCountLabel: '#todo-count .label',
            clearCount: '#clear-completed .count',
            filters: '#filters a'
        },
        events: {
            'click #clear-completed': 'onClearClick'
        },
        initialize: function() {
            this.bindTo(App.vent, 'todoList:filter', this.updateFilterSelection, this);
            this.bindTo(this.collection, 'all', this.updateCount, this);
        },
        onRender: function() {
            this.updateCount();
        },
        updateCount: function() {
            var activeCount = this.collection.getActive().length,
            completedCount = this.collection.getCompleted().length;
            this.ui.todoCount.html(activeCount);
            this.ui.todoCountLabel.html(activeCount === 1 ? 'Item' : 'items');
            this.ui.clearCount.html(completedCount === 0 ? '' : '(' + completedCount + ')');
        },
        updateFilterSelection: function(filter) {
            this.ui.filters
                .removeClass('selected')
                .filter('[href="#' + filter + '"]')
                .addClass('selected');
        },
        onClearClick: function() {
            var completed = this.collection.getCompleted();
            completed.forEach(function destroy(todo) {
                todo.destroy();
            });
        }
    });
});