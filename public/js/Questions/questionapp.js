angular.module('createTest.questions', []).service('Question', function ($http) {
    var questions = [];
    return {
        create: function (question) {
            questions.unshift(question);
        },
        clear: function () {
            questions = [];
        },
        get cached_local () {
            return questions;
        },
        submit: function(title, tags) {
            questions.reverse();
            var testObject = {
                title:  title,
                tags: tags,
                questions: questions
            };
            return $http.post('/tests', testObject);
        }
    }
}).controller('QuestionController', function ($scope, Question) {

    clearNewQuestion();
    $scope.title = '';
    $scope.tags = '';
    $scope.addQuestion = function () {
        if ($scope.new_question.question === '' || $scope.new_question.answer === '') return;
        console.log('added a new question ... ');
        Question.create($scope.new_question);
        clearNewQuestion();
        $scope.questions = Question.cached_local;
    };

    function clearNewQuestion() {
        $scope.new_question = {
            question: '',
            type: '',
            choices: [],
            bool: false,
            answer: ''
        };
    }

    $scope.submitTest = function () {
        Question.submit($scope.title, $scope.tags).then(function (data) {
            console.log(data);
        });
    };

});