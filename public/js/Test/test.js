
angular.module('test', []).service('IndividualTest', function($http){

    return {
        submit: function(testid, title, tags, questions, userAnswers){
            var testObject = {
                title: title,
                tags: tags,
                questions: questions,
                userAnswers: userAnswers

            };
            return $http.put('/tests/' + testid, testObject);
        }

    }
}).controller('TestIndividualController', function ($scope, Test, IndividualTest, $routeParams) {

    Test.getTest($routeParams.id).success(function(data) {
        $scope.index = 0;
        $scope.test = data;
        $scope.title = data.title;
        $scope.tags = data.tags;
        $scope.questions = data.questions;
        $scope.userAnswers = data.userAnswers;
        $scope.testid = data._id;
        $scope.answer = $scope.questions[$scope.index].answer;
    });

    $scope.getEachQuestion = function(question, index){
        $scope.question = question;
        $scope.index = index;
        $scope.answer = $scope.questions[$scope.index].answer;
    };

    $scope.updateAnswer = function(){
        $scope.userAnswers = $scope.answer;
    };

    $scope.next = function() {

       if ($scope.index >= $scope.questions.length - 1) {
            $scope.index = 0;
            if($scope.userAnswers === undefined){
                $scope.answer = ''
            } else {
                $scope.answer = $scope.questions[$scope.index].answer;
            }
        } else {
            $scope.index++;
            if($scope.userAnswers === undefined){
                $scope.answer = ''
            } else {
                $scope.answer = $scope.questions[$scope.index].answer;
            }
        }
    };

   $scope.previous = function() {

        if($scope.index <= 0){
            $scope.index = $scope.questions.length - 1;
            if($scope.userAnswers === undefined){
                $scope.answer = ''
            } else {
                $scope.answer = $scope.questions[$scope.index].answer;
            }
        }
        else {
            $scope.index--;
            if($scope.userAnswers === undefined){
                $scope.answer = ''
            } else {
                $scope.answer = $scope.questions[$scope.index].answer;
            }
        }
    };

 // $('[data-toggle=confirmation]').confirmation($scope.submitTest);

    $scope.submitTest = function() {

        IndividualTest.submit($scope.testid, $scope.title, $scope.tags, $scope.questions, $scope.userAnswers).then(function(data){
            console.log("here is the final result");
            console.log(data);
        });
    };


});