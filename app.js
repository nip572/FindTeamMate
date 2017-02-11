//module
var TeamApp = angular.module('TeamApp',['ngRoute' , 'ngResource' , 'firebase']);


//Routes

TeamApp.config(function ($routeProvider , $locationProvider) {

    $routeProvider
    .when('/', {
      templateUrl:'pages/login.html',
      controller:'loginController'
    })
    .when('/:id', {
      templateUrl:'pages/home.htm',
      controller:'homeController',
    })
        .when('/:id/result', {
            templateUrl:'pages/list.htm',
            controller:'listController',
        });
     $locationProvider.hashPrefix('');
});

//services
TeamApp.service('Service' , ['$http', function($http) {

}]);


//controllers

TeamApp.controller('loginController' ,['$scope', 'Service', function($scope , Service) {

    $scope.test = "I am login";
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

}]);

TeamApp.controller('homeController' ,['$scope', 'Service', '$route', '$routeParams', function($scope , Service , $route, $routeParams) {

    $scope.test = "I am Home ";
    $scope.param = $routeParams.id;
    console.log($scope.param);


}]);


TeamApp.controller('listController' ,['$scope', '$http','Service','$route', '$routeParams','$firebaseObject' ,
    function($scope , $http, Service, $route, $routeParams , $firebaseObject) {

    $scope.test = "I am List";
    $scope.param = $routeParams.id;
    console.log($scope.param);

    var ref = firebase.database().ref();
    $scope.name = $firebaseObject(ref);


}]);
