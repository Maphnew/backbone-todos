var ZombieView = Backbone.View.extend({
    template: '#my-view-template',
    initialize: function() {
        this.model.on('change', this.render, this);
    },
    close: function() { // new: 이벤트 바인딩 해제
        this.stopListening();
    },
    render: function() {
        alert("We're rendering the view");
    }
});

var Person = Backbone.Model.extend({
    defaults: {
        "firstName": "Jeremy",
        "lastName": "Ashkenas",
        "email": "jeremy@example.com"
    }
});

var Derick = new Person({
    firstName: 'Derick',
    lastName: 'Bailey',
    email: 'derickbailey@example.com'
});

var zombieView = new ZombieView({
    model: Derick
});

zombieView = new ZombieView({
    model: Derick
});

Derick.set('email', 'derickbailey@example.com');