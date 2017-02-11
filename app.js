//module
var TeamApp = angular.module('TeamApp',['ngRoute' , 'ngResource' , 'firebase']);


//Routes

TeamApp.config(function ($routeProvider , $locationProvider) {

    $routeProvider
    .when('/', {
      templateUrl:'pages/login.html',
      controller:'AuthCtrl'
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
TeamApp.factory('Auth' , function($firebaseAuth) {
var auth = $firebaseAuth();
    return auth;
});


//controllers

TeamApp.controller('AuthCtrl' ,['$scope', '$window','Auth', function($scope , $window,Auth) {

    $scope.test = "I am login";
    var authCtrl = this;
   $scope.email = "";
   $scope.password = "";


    $scope.login = function () {

        console.log("In Login Method");
        Auth.$signInWithEmailAndPassword($scope.email , $scope.password).then(function (auth) {
            console.log("Logged in successfully");
            $window.location.href = 'pages/home.htm';

        }, function (error) {
                console.log("Error Occured" + error.message);
            });
    };


    $scope.createUser = function () {
        console.log("In create Method");
        Auth.$createUserWithEmailAndPassword($scope.email , $scope.password).then(function (auth) {
            console.log("User Created Successfully");
            $scope.login();
        }, function (error) {
            console.log("Error Occured" + error.message);
        });
    };


}]);

TeamApp.controller('homeController' ,['$scope', 'Service', '$route', '$routeParams', function($scope , Service , $route, $routeParams) {

    $scope.test = "I am Home ";
    $scope.param = $routeParams.id;
    console.log($scope.param);


}]);


TeamApp.controller('listController' ,['$scope', '$http','Service','$route', '$routeParams' ,
    function($scope , $http, Service, $route, $routeParams ) {

    $scope.test = "I am List";
    $scope.param = $routeParams.id;
    console.log($scope.param);




}]);
