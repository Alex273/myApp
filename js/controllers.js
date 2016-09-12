'use strict';

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
		controller:'MyListCtrl'
	})
	.when('/archive',{
		templateUrl:'template/archive.html',
		controller:'ArchiveCtrl'
	})
	.when('/categories/bread',{
		templateUrl:'template/bread.html',
		controller:'BreadListCtrl'
	})
  .when('/categories/meat',{
    templateUrl:'template/meat.html',
    controller:'MeatListCtrl'
  })
  .when('/categories/milk',{
    templateUrl:'template/milk.html',
    controller:'MilkListCtrl'
  })
  .when('/categories/fruits',{
    templateUrl:'template/fruits.html',
    controller:'FruitsListCtrl'
  })

  .otherwise({
		redirectTo:'/'
	})
}]);




//main Controller
myApp.controller('MyAppListCtrl', [ '$scope', '$http', '$location', function($scope, $http, $location) {    
  
  console.log('$location.url() - ', $location.url());  
  $http.get('categories/categories.json').success(function(data, status, headers, config) { 
  $scope.categories = data;
  });
                          
}]);

//bread Controller
myApp.controller('BreadListCtrl', [ '$scope', '$http', '$location', function($scope, $http, $location) {    
  
  $http.get('categories/bread.json').success(function(data, status, headers, config) { 
  $scope.bread = data;
  });
   
  //$scope.back=function() {    
  //$window.history.back(); 
   //} 

}]);

//meat Controller
myApp.controller('MeatListCtrl', [ '$scope', '$http', '$location', function($scope, $http, $location) {    
  
  $http.get('categories/meat.json').success(function(data, status, headers, config) { 
  $scope.meat = data;
  });
                          
}]);

//milk Controller
myApp.controller('MilkListCtrl', [ '$scope', '$http', '$location', function($scope, $http, $location) {    
  
  $http.get('categories/milk.json').success(function(data, status, headers, config) { 
  $scope.milk = data;
  });
                          
}]);

//fruits Controller
myApp.controller('FruitsListCtrl', [ '$scope', '$http', '$location', function($scope, $http, $location) {    
  
  $http.get('categories/fruits.json').success(function(data, status, headers, config) { 
  $scope.fruits = data;
  });
                          
}]);

//mylist Controller
myApp.controller('MyListCtrl', ['$scope','$http','$location', function($scope, $http, $location) {
	
}]);

//archive Controller
myApp.controller('ArchiveCtrl', ['$scope','$http','$location', function($scope, $http, $location) {
	
}]);


//product Controller
myApp.controller('ProductListCtrl',[ '$scope','$http', '$location', '$routeParams', 'Product',
  function($scope, $http, $location, $routeParams, Product) {
    $scope.productId = $routeParams.productId; 

  }
]);    


