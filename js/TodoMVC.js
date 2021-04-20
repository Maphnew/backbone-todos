// TodoMVC 앱을 나타내는 기본적인 애플리케이션 객체 정의
// 초기화 코드를 가지고 있고, 앱의 기본 레이아웃 위치를 정의한다.
var TodoMVC = new Backbone.Marionette.Application();

TodoMVC.addRegions({
    header: '#header',
    main: '#main',
    footer: '#footer'
});

TodoMVC.on('initialize:after', function() {
    Backbone.history.start();
});
// 애플리케이션 객체가 초기화되면 초기 URL로 이동하기 위해 Backbone.history.start()를 호출한다.