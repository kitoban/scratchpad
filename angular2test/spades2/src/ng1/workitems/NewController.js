( function() {
  'use strict';
  
  angular.module( 'ace' ).controller( 'WorkItems.NewController', workItemsNewController );

  function workItemsNewController( $scope ) {
    console.log( 'WorkItems.NewController' );
    $scope.initialised = false;

    $scope.creating = false;
    $scope.workItem = {};
    $scope.effectivity = { selected: {} };
    $scope.users = { selected: [] };
  }
} )();
