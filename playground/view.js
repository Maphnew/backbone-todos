var MyView = Backbone.View.extend({
    template: $('#my-view-template').html(),
    render: function() {
        var compiledTemplate = _.template(this.template);

        var data = this.model.toJSON();
        var html = compiledTemplate(data);
        this.$el.html(html);
    }
});

var Derick = new Person({
    firstName: 'Derick',
    lastName: 'Bailey',
    email: 'derickbailey@example.com'
});

var myView = new MyView({
    model: Derick
})

myView.render();

$('#content').html(myView.el)

// Marionette

var MyView = Marionette.ItemView.extend({
    template: '#my-view-template'
});