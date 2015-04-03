angular
    .module('myApp', ['ngRoute', 'ngAnimate', 'account', 'createTest.questions', 'tests',
        'ngAnimate'
    ])
    .config(function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: '/partials/_login.html',
            controller: 'RegisterController'
        }).when('/browse', {
            templateUrl: '/partials/_browse_tests.html',
            controller: 'BrowseTestController'
        }).when('/tests/create', {
            templateUrl: '/partials/_create_test.html',
            controller: 'QuestionController'
        }).when('/tests/:id', {
            templateUrl: '/partials/_test.html',
            controller: 'TestController'
        }).otherwise({
            redirectTo: '/login'
        });
    })
    .controller('LoginController', function () {
    this.message = 'Hello World Message!';
});

