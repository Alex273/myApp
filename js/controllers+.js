'use strict';

/* Controllers */
var myApp = angular.module('myApp', []);

 myApp.controller('MyAppListCtrl', function($scope) { 
    
      $scope.categories = [
          { 'name': 'bread',
          'name':'milk',
          'name':'meet',
          'name':'fruits'
          }];
    });
   

    
