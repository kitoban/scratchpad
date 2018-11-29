'use strict';

angular.
  module( 'ace.model' ).
  factory( 'WorkItems', ['$resource',
    function( $resource ) {
      return $resource( 'ng1/models/work-item/:workitemId.json', {}, {
        query: {
          method: 'GET',
          params: { workitemId: 'workitems' },
          isArray: true
        }
      } );
    }
  ] );
