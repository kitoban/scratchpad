( function( angular ) {
  'use strict';

  angular.module( 'ace' ).directive( 'csLabeledControl', csLabeledControl );

  function csLabeledControl() {
    return {
      restrict: 'E',
      scope: {
        label: '@',
        'for': '@'
      },
      transclude: true,
      link: function( scope, elm, attrs ) {
        var control = null;

        function findNearestFormControl() {
          var i = elm.find( '[ng-model]' );

          if ( i.length ) {
            control = i[0];
            if ( !control.id ) {
              // if the element doesn't have an id, assign it one so it can be referenced by the label
              var name = $( control ).attr( 'name' ) || Math.floor( ( Math.random() * 999999 ) + 100000 );
              control.id = name + '_id';
            }
            return { id: control.id, name: $( control ).attr( 'name' ) };
          }
          return undefined;
        }

        if ( attrs.for ) {
          control = elm.find( '#' + attrs.for )[0];
          scope.controlDetails = {
            id: attrs.for,
            name: $( control ).attr( 'name' )
          };
        }
        else {
          // if we have no explicit binding find the closest form element
          scope.controlDetails = findNearestFormControl();
        }

        // if we can't find a control, set up an observer, incase one becomes visible later
        if ( !control ) {
          var observer = new MutationObserver( function( mutations ) {
            scope.controlDetails = findNearestFormControl();
            if ( control ) {
              observer.disconnect();
            }
          } );
          observer.observe( elm.find( 'div.controls' )[0], { childList: true, subtree: true } );
        }
      },
      template:
          '<div class="control-group">' +
          '  <label class="control-label" for="{{ controlDetails.id }}">{{ label }}</label>' +
          '  <div class="controls controls-row" ng-transclude></div>' +
          '  <validation-message class="controls" control-name="{{ controlDetails.name }}" friendly-name="{{ label }}"></validation-message>' +
          '</div>'
    }
  }
} )( window.angular );
