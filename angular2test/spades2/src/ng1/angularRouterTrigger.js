'use strict';

angular.module( 'ace' ).run( ['angularRouterHook', '$rootScope', '$location',
  ( angularRouterHook, $rootScope, $location ) => {
    $rootScope.$on( '$locationChangeSuccess', () => {
      console.log( 'angularRouterHook navigateByUrl triggered: ' + $location.path() )
      angularRouterHook.navigateByUrl( $location.path() );
    } );
  } ]
);