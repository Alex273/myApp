'use strict';

/* Controllers */
var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);

myApp.config(['$routeProvider','$locationProvider', function($routeProvide, $locationProvider) {
	$locationProvider.html5Mode({
		enabled:true,
		requireBase: false
	})
	
	$routeProvide
	.when('/',{
		templateUrl:'template/main.html',
		controller:'MyAppListCtrl'
	})
	.when('/mylist',{
		templateUrl:'template/mylist.html',
		controller:'AboutCtrl'
	})
	.when('/archive',{
		templateUrl:'template/archive.html',
		controller:'ContactCtrl'
	})
	.when('/phones/:phoneId',{
		templateUrl:'template/phone-detail.html',
		controller:'PhoneDetailCtrl'
	})
	.otherwise({
		redirectTo:'/'
	})
}]);

/* Factory */
myApp.factory('Phone', [
  '$resource', function($resource) {
    return $resource('phones/:phoneId.:format', {
      phoneId: 'phones',
      format: 'json',
      apiKey: 'someKeyThis'
      /* http://localhost:8888/phones/phones.json?apiKey=someKeyThis */
    }, {
      // action: {method: <?>, params: <?>, isArray: <?>, ...}
      update: {method: 'PUT', params: {phoneId: '@phone'}, isArray: true}
    });
    //Phone.update(params, successcb, errorcb);
  }
]);


/* Filter */
myApp.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  }
});

//MyAppListCtrl Controller
myApp.controller('MyAppListCtrl',[
  '$scope','$http', '$location', 'Phone',
  function($scope, $http, $location, Phone) {

   
     Phone.query({phoneId: 'phones'}, function(data) {
      $scope.phones = data;
    });
   

    //Phone.query(params, successcb, errorcb)

    //Phone.get(params, successcb, errorcb)

    //Phone.save(params, payloadData, successcb, errorcb)

    //Phone.delete(params, successcb, errorcb)

  }
]);

//About Controller
myApp.controller('AboutCtrl', ['$scope','$http','$location', function($scope, $http, $location) {
	
}]);

//Contact Controller
myApp.controller('ContactCtrl', ['$scope','$http','$location', function($scope, $http, $location) {
	
}]);

/* Phone Detail Controller */
myApp.controller('PhoneDetailCtrl',[
  '$scope','$http', '$location', '$routeParams', 'Phone',
  function($scope, $http, $location, $routeParams, Phone) {
    $scope.phoneId = $routeParams.phoneId;

    Phone.get({phoneId: $routeParams.phoneId}, function(data) {
      $scope.phone = data;
      $scope.mainImageUrl = data.images[0];
      //data.$save();
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }

  }
]);


