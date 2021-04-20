var app = app || {};

$(function( $ ) {
    'use strict';
    app.AppView = Backbone.View.extend({
        el: '#todoapp',
        statsTemplate: _.template( $('#stats-template').html() ),
        // new
        events: {
            'keypress #new-todo': 'createOnEnter',
            'click #clear-completed': 'clearCompleted',
            'click #toggle-all': 'toggleAllComplete'
        },
        initialize: function() {
            this.input = this.$('#new-todo');
            this.allCheckbox = this.$('#toggle-all')[0];
            this.$footer = this.$('#footer');
            this.$main = this.$('#main');

            app.Todos.on( 'add', this.addOne, this );
            app.Todos.on( 'reset', this.addAll, this);
            // new
            app.Todos.on( 'change:completed', this.filterOne, this );
            app.Todos.on( 'filter', this.filterAll, this );
            app.Todos.on( 'all', this.render, this );
            app.Todos.fetch();
        },
        // new
        render: function() {
            var completed = app.Todos.completed().length;
            var remaining = app.Todos.remaining().length;

            if ( app.Todos.length ) {
                this.$main.show();
                this.$footer.show();

                this.$footer.html(this.statsTemplate({
                    completed: completed,
                    remaining: remaining
                }));

                this.$('#filters li a')
                    .removeClass('selected')
                    .filter('[href="#/' + (app.TodoFilter || '') + '"]')
                    .addClass('selected');
            } else {
                this.$main.hide();
                this.$footer.hide();
            }

            this.allCheckbox.checked = !remaining;
        },
        addOne: function( todo ) {
            var view = new app.TodoView({ model: todo });
            $('#todo-list').append( view.render().el );
        },
        addAll: function() {
            this.$('#todo-list').html('');
            app.Todos.each(this.addOne, this);
        },
        // new
        filterOne: function(todo) {
            todo.trigger('visible');
        },
        // new
        filterAll: function() {
            app.Todos.each(this.filterOne, this);
        },
        // new
        newAttributes: function() {
            return {
                title: this.input.val().trim(),
                order: app.Todos.nextOrder(),
                completed: false
            };
        },
        // new
        createOnEnter: function( e ) {
            if ( e.which !== ENTER_KEY || !this.input.val().trim() ) {
                return;
            }
            app.Todos.create( this.newAttributes() );
            this.input.val('');
        },
        // new
        clearCompleted: function() {
            _.each( app.Todos.completed(), function( todo ) {
                todo.destroy();
            });
            return false;
        },
        // new
        toggleAllComplete: function() {
            var completed = this.allCheckbox.checked;
            app.Todos.each(function( todo ) {
                todo.save({
                    'completed': completed
                });
            });
        }
    });
});