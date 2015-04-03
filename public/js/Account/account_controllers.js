angular.module('account.controllers', ['account.services'])
    .controller('RegisterController', function ($scope, User) {
        $scope.newuser = {
            name: '',
            email: '',
            password: ''
        };
        $scope.registration_error = '';
        $scope.register = function () {
            $scope.registration_success = '';
            $scope.registration_error = '';
            console.log('Trying to register ', $scope.newuser);
            console.log(User.register);
            User.register($scope.newuser).then(function (data) {
                $scope.registration_success = true;
                console.log('The new user was successfully registered.');
                $scope.newuser = {
                    name: '',
                    email: '',
                    password: ''
                };
            }, function (err) {
                // This is the curated err message from the service
                console.log(err);
                $scope.registration_error = err.data.err.message;
            });
        };
        $scope.user = {
            username: '',
            password: ''
        };
        $scope.login = function () {
            console.log($scope.user);
            User.login($scope.user).then(function (data) {
                console.log(data);
                $scope.user = {
                    username: '',
                    password: ''
                };
                $scope.login_success = true;
            }, function (err) {
                console.log(err);
            });
        };
    })
    .controller('LoginController', function ($scope, User) {


    });