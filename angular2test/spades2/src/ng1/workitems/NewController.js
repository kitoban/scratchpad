( function() {
  'use strict';
  
  angular.module( 'ace' ).controller( 'WorkItems.NewController', workItemsNewController );

  function workItemsNewController( $scope ) {
    $scope.initialised = false;

    $scope.creating = false;
    $scope.workItem = {};
    $scope.effectivity = { selected: {} };
    $scope.users = { selected: [] };
  }
} )();
