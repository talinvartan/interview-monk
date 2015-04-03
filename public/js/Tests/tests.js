angular.module('tests', []).service('Test', function ($http) {
    return {
        getAll: function() {
            return $http.get('/tests');
        },
        getTest: function(testid) {
            return $http.get('/tests/' + testid);
        }
    }
}).filter('split', function () {
    return function (tagstring) {
        return tagstring.split(',');
    }
}).controller('BrowseTestController', function ($scope, Test) {
    $scope.tests = Test.getAll().success(function (data) {

        data.forEach(function (test) {
            test.tags = test.tags.split(',');
        });
        console.log(data);
        $scope.tests = data;
    });
}).controller('TestController', function ($scope, Test, $routeParams) {
    Test.getTest($routeParams.id);
});