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
  
  $http.get('categories/categories.json').success(function(data, status, headers, config) { 
  $scope.categories = data;
  });

}]);

//bread Controller
myApp.controller('BreadListCtrl', [ '$scope', '$http', '$location', function($scope, $http, $location) {    
  
  $http.get('categories/bread.json').success(function(data, status, headers, config) { 
  $scope.bread = data;
  });
   
  $scope.add = function(){
  var selectedProducts = [];
  angular.forEach($scope.bread, function(product) {
    if(product.selected) selectedProducts.push(product);
  });
 
 sessionStorage.setItem('bread', JSON.stringify(selectedProducts)); 
 console.log(JSON.parse(sessionStorage.getItem('bread')));  
  };

 $scope.goBack = function() {
  window.history.back();
 };   
}]);

//meat Controller
myApp.controller('MeatListCtrl', [ '$scope', '$http', '$location', function($scope, $http, $location) {    
  
  $http.get('categories/meat.json').success(function(data, status, headers, config) { 
  $scope.meat = data;
  });

  $scope.add = function(){
  var selectedProducts = [];
  angular.forEach($scope.meat, function(product) {
    if(product.selected) selectedProducts.push(product);
  });
 
 sessionStorage.setItem('meat', JSON.stringify(selectedProducts)); 
 console.log(JSON.parse(sessionStorage.getItem('meat')));  
  };

  $scope.goBack = function() {
  window.history.back();
 };
                          
}]);

//milk Controller
myApp.controller('MilkListCtrl', [ '$scope', '$http', '$location', function($scope, $http, $location) {    
  
  $http.get('categories/milk.json').success(function(data, status, headers, config) { 
  $scope.milk = data;
  });

  $scope.add = function(){
  var selectedProducts = [];
  angular.forEach($scope.milk, function(product) {
    if(product.selected) selectedProducts.push(product);
  });
 
 sessionStorage.setItem('milk', JSON.stringify(selectedProducts)); 
 console.log(JSON.parse(sessionStorage.getItem('milk')));  
  };

  $scope.goBack = function() {
  window.history.back();
 };
                          
}]);

//fruits Controller
myApp.controller('FruitsListCtrl', [ '$scope', '$http', '$location', function($scope, $http, $location) {    
  
  $http.get('categories/fruits.json').success(function(data, status, headers, config) { 
  $scope.fruits = data;
  });

  $scope.add = function(){
  var selectedProducts = [];
  angular.forEach($scope.fruits, function(product) {
    if(product.selected) selectedProducts.push(product);
  });
 
 sessionStorage.setItem('fruits', JSON.stringify(selectedProducts)); 
 console.log(JSON.parse(sessionStorage.getItem('fruits')));  
  };

  $scope.goBack = function() {
  window.history.back();
  };
                          
}]);

//mylist Controller
myApp.controller('MyListCtrl', ['$scope','$http','$location', function($scope, $http, $location) {
$scope.goBack = function() {
  window.history.back();
 };

if (sessionStorage.length == 0) {
$scope.message = 'Ваш список пуст!';
}

$scope.clearAll = function(){
 sessionStorage.clear();
    console.log(sessionStorage);
  };

$scope.dataBread = sessionStorage.getItem('bread');
$scope.breadList = JSON.parse($scope.dataBread);

$scope.dataMeat = sessionStorage.getItem('meat');
$scope.meatList = JSON.parse($scope.dataMeat);

$scope.dataMilk = sessionStorage.getItem('milk');
$scope.milkList = JSON.parse($scope.dataMilk);

$scope.dataFruits = sessionStorage.getItem('fruits');
$scope.fruitsList = JSON.parse($scope.dataFruits);


$scope.del = function(prod) {
var value = prod.name;

var detect = function(key, variable) {
var arr = variable,
 category = key;

 for (var i=0; i<arr.length; i++) {
  if (arr[i].name == value) {
     arr.splice(i,1);
  }   
 }

if (arr.length == 0) {
  sessionStorage.removeItem(category);
} else {
var newValue = arr;
sessionStorage.setItem(category, JSON.stringify(newValue));
 }

}

if (prod.category == 'bread') {
  detect('bread', $scope.breadList);
}

switch (prod.category) {
  case 'bread':
    detect('bread', $scope.breadList);
    break;
  case 'meat':
    detect('meat',$scope.meatList);
    break;
  case 'milk':
   detect('milk',$scope.milkList);
    break;
  case 'fruits':
   detect('fruits',$scope.fruitsList);
   break;
 }
};

}]);

//archive Controller
myApp.controller('ArchiveCtrl', ['$scope','$http','$location', function($scope, $http, $location) {
$scope.goBack = function() {
  window.history.back();
 };
$scope.getData = function(){
 $scope.dataFruits = sessionStorage.getItem('bread');
 $scope.products = JSON.parse($scope.dataFruits);
  //console.log($scope.products);
  }; 
	
}]);

//product Controller
myApp.controller('ProductListCtrl',[ '$scope','$http', '$location', '$routeParams', 'Product',
  function($scope, $http, $location, $routeParams, Product) {
    $scope.productId = $routeParams.productId; 

  }
]);    


