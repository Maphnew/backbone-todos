var app = app || {};

$(function() {
    'use strict';
    app.TodoView = Backbone.View.extend({
        tagName: 'li',
        template: _.template( $('#item-template').html() ),
        events: {
            'click .toggle': 'togglecompleted', // new
            'dblclick label': 'edit',
            'click .destroy': 'clear', // new
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close'
        },
        initialize: function() {
            this.model.on( 'change', this.render, this );
            this.model.on( 'destroy', this.remove, this ); // new
            this.model.on( 'visible', this.toggleVisible, this ); // new
        },
        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            this.$el.toggleClass( 'completed', this.model.get('completed') ); // new
            this.toggleVisible(); // new
            this.input = this.$('.edit');
            return this;
        },
        // new
        toggleVisible: function () {
            this.$el.toggleClass('hidden', this.isHidden());
        },
        // new
        isHidden: function() {
            var isCompleted = this.model.get('completed');
            return (
                (!isCompleted && app.TodoFilter === 'completed')
                || (isCompleted && app.TodoFilter === 'active')
            );
        },
        // new
        togglecompleted: function() {
            this.model.toggle();
        },
        edit: function() {
            this.$el.addClass('editing');
            this.input.focus();
        },
        close: function() {
            var value = this.input.val().trim();
            if ( value ) {
                this.model.save({ title: value });
            } else {
                this.clear(); // new
            }
            this.$el.removeClass('editing');
        },
        updateOnEnter: function( e ) {
            if ( e.which === ENTER_KEY ) {
                this.close();
            }
        },
        // new
        clear: function() {
            this.model.destroy();
        }
    });
});