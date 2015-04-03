angular.module('account.services', []).service('User', function ($http, $q) {
    return {
        current: null,
        register: function (loginObject) {
            // loginObject should have username, password and email

            // using $q the ES6 promuises way ...
            return $q(function (resolve, reject) {
                $http.post('/account/register', loginObject).then(function (data) {
                    console.log(data);
                    resolve(data);
                }, function (err, status, headers, config) {
                    console.log(err);
                    reject(err);
                });
            });
        },
        login: function (loginObject) {
            return $q(function (resolve, reject) {
                $http.post('/account/login', loginObject).then(function (data) {
                    resolve(data);
                }, function (err) {
                    reject(err);
                });
            });
        }
    }
});