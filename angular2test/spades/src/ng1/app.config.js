'use strict';

angular.
  module( 'ace' ).
  config( ['$locationProvider', '$routeProvider',
    function config( $locationProvider, $routeProvider ) {
      //$locationProvider.hashPrefix('!');

      $routeProvider.
        when( '/wi', {
          template: '<work-item-list></work-item-list>'
        } ).
        // when( '/phones/:phoneId', {
        //   template: '<phone-detail></phone-detail>'
        // } ).
        when( '/ng2-demo', {
          template: '<ng2-demo></ng2-demo>'
        } )
        .otherwise( { template: '' } );
      //.
      // otherwise('/phones');
    }
  ] );
