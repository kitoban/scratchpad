( function() {
  'use strict';
  
  angular.module( 'ace' ).controller( 'WorkItems.NewController', workItemsNewController );

  function workItemsNewController( $scope, bodyService ) {
    $scope.initialised = false;
    $scope.body = bodyService;
    $scope.creating = false;
    $scope.workItem = {};
    $scope.effectivity = { selected: {} };
    $scope.users = { selected: [] };
  }
} )();
