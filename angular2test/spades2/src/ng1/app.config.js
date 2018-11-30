'use strict';

angular.
  module('ace').
  config( ['$locationProvider', '$routeProvider', 
    function config( $locationProvider, $routeProvider ) {
      $locationProvider
        .hashPrefix( '' )
        .html5Mode( true );

      $routeProvider.
        when('/wi', {
          template: '<work-item-list></work-item-list>'
        }).
        when('/wi/new', {
          templateUrl: "ng1/workitems/new.html"
        } ).
        // when('/ng2-demo', {
        //   template: '<ng2-demo></ng2-demo>'
        // }).
        otherwise({template : ''});
        //.
       // otherwise('/phones');
    }
  ]);
