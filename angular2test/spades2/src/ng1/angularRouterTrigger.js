'use strict';

angular.module( 'ace' ).run( ['angularRouterHook', '$rootScope', '$location',
  ( angularRouterHook, $rootScope, $location ) => {
    $rootScope.$on( '$locationChangeSuccess', () => {
      console.log( 'angularRouterHook navigateByUrl triggered' )
      angularRouterHook.navigateByUrl( $location.path() );
    } );
  } ]
);