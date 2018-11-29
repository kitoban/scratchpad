'use strict';

angular.
  module( 'ace' ).
  component( 'workItemList', {
    templateUrl: 'ng1/work-item-list/work-item-list.template.html',
    controller: ['WorkItems', '$scope', '$location',
      function WorkItemListController( WorkItems, $scope, $location ) {
        this.workItems = WorkItems.query();

        this.isAssignedTo = workItem => {
          return true;
        }

        this.isActive = workItem => {
          return workItem.status === 'New' ||
            workItem.status === 'InProgress' ||
            workItem.status === 'InConflict';
        };

        this.gotoHomePage = workItem => {
          $location.url( '/wi/' + workItem.workItemNumber + '/model/products/productgroups/index' );
        };

        this.gotoNew = () => {
          $location.url( '/wi/new' );
        }
      }
    ]
  } );


// ( function() {
//   'use strict';

//   angular.module( 'ace' ).controller( 'WorkItems.IndexController', workItemsIndexController );

//   function workItemsIndexController( $scope, $location, WorkItems, Users, user, ngynRoute, security, IndexFiltersHelper ) {
//     const statusIconMap = {
//       'New': 'icon-star',
//       'InProgress': 'icon-play-circled',
//       'InConflict': 'icon-warning-sign',
//       'Promoted': 'icon-circle-arrow-up',
//       'Closed': 'icon-remove-circle'
//     };

//     const defaultStatusFilters = ['InConflict', 'InProgress', 'New'];
//     const defaultUserFilters = [user.currentUser.id];
//     const pagePath = $location.path();
//     const search = $location.search();
//     let oldSearchParams = angular.copy( $location.search() );
//     let activeStatusFilters = [];
//     let activeUserFilters = [];

//     if ( search.status !== 'none' ) {
//       activeStatusFilters = search.status ? search.status.split( ',' ) : defaultStatusFilters;
//     }
//     if ( search.users !== 'none' ) {
//       activeUserFilters = search.users ? search.users.split( ',' ).map( id => +id ) : defaultUserFilters;
//     }

//     const queryParams = {
//       primary: true,
//       paging: true,
//       $expand: 'WorkItemType,AssignedUsers,AssignedUsers.User,DefaultScopes',
//       $orderby: 'WorkItemType.SortOrder DESC,WorkItemNumber DESC'
//     };

//     const newFilter = { name: 'New', icon: statusIconMap['New'], key: 'New', dividerBelow: true, id: 0, isSelected: true };
//     const inProgressFilter = { name: 'In Progress', icon: statusIconMap['InProgress'], key: 'InProgress', dividerBelow: true, id: 1, isSelected: true };
//     const inConflictFilter = { name: 'Update In Progress', icon: statusIconMap['InConflict'], key: 'InConflict', dividerBelow: true, id: 2, isSelected: true };
//     const promotedFilter = { name: 'Promoted', icon: statusIconMap['Promoted'], key: 'Promoted', dividerBelow: true, id: 3 };
//     const closedFilter = { name: 'Closed', icon: statusIconMap['Closed'], key: 'Closed', dividerBelow: false, id: 4 };

//     $scope.ctrl = {};
//     $scope.showResetFilters = false;

//     $scope.filters = {
//       options: {
//         status: [
//           newFilter,
//           inProgressFilter,
//           inConflictFilter,
//           promotedFilter,
//           closedFilter
//         ],
//         users: []
//       },
//       selected: {
//         status: [],
//         users: []
//       }
//     };

//     $scope.filters.options.users = Users.query( { $orderBy: 'FirstName ASC, LastName ASC, Username ASC, Provider ASC' }, users => {
//       let meIndex = -1;

//       users.forEach( ( u, idx ) => {
//         u.name = `${u.firstName} ${u.lastName}`;
//         u.isSelected = activeUserFilters.indexOf( u.id ) >= 0;

//         if ( u.id === user.currentUser.id ) {
//           u.name = `Me (${u.name})`;
//           meIndex = idx;
//         }
//       } );

//       if ( meIndex > 0 ) {
//         // Splice 'me' out of array and re-add to start (unshift)
//         users.unshift( users.splice( meIndex, 1 )[0] );
//       }

//       updateUserFilter();
//     } );

//     updateStatusFilter();
//     refresh();

//     $scope.ctrl.updateFilters = () => {
//       $location.search( 'p', null );

//       $scope.showResetFilters = statusFiltersChanged() || activeUserFilters.length !== 1 || activeUserFilters.indexOf( user.currentUser.id ) < 0;
//       activeUserFilters = $scope.filters.selected.users.filter( f => f.isSelected ).map( f => f.id );
//       activeStatusFilters = $scope.filters.selected.status.filter( f => f.isSelected ).map( f => f.key );
//       updateQueryString();
//     };

//     $scope.gotoHomePage = workItem => {
//       WorkItems.getProductRangeLink( workItem ).then( route => ngynRoute.gotoLink( route ) );
//     };

//     $scope.canStart = workItem => {
//       return workItem.status === 'New' && security.canPerform( 'UpdateWorkItems', true ) && WorkItems.isAssignedTo( workItem, $scope.currentUser );
//     };

//     $scope.isAssignedTo = workItem => {
//       return WorkItems.isAssignedTo( workItem, $scope.currentUser );
//     }

//     $scope.start = workItem => {
//       if ( workItem.status !== 'New' ) {
//         return;
//       }

//       WorkItems.start( workItem, () => {
//         WorkItems.getProductRangeLink( workItem ).then( route => ngynRoute.gotoLink( route ) );
//       } );
//     };

//     $scope.statusIcon = status => statusIconMap[status];

//     $scope.filterPlaceholderText = IndexFiltersHelper.filterPlaceholderText;

//     $scope.getUsers = workItem => {
//       if ( !workItem.users ) {
//         workItem.users = workItem.assignedUsers.map( au => au.user );
//       }
//       return workItem.users;
//     };

//     $scope.isActive = workItem => {
//       return workItem.status === 'New' ||
//         workItem.status === 'InProgress' ||
//         workItem.status === 'InConflict';
//     };

//     $scope.resetFilters = () => {
//       $location.search( 'p', null );

//       $scope.showResetFilters = false;
//       activeUserFilters = defaultUserFilters;
//       activeStatusFilters = defaultStatusFilters;

//       $location.search( 'status', null );
//       $location.search( 'users', null );
//     };

//     $scope.$on( '$locationChangeSuccess', ( evt, newUrl ) => {
//       if ( newUrl.indexOf( pagePath ) < 0 ) {
//         oldSearchParams = {};
//         return;
//       }
//       const locationSearch = $location.search();
//       // check if any filters have changed
//       const changed = ['users', 'status'].some( ( key ) =>
//         oldSearchParams[key] !== locationSearch[key]
//       );

//       if ( changed ) {
//         queryParams.page = $location.search().p;
//         let usersArr = [];
//         let statusArr = [];
//         if ( locationSearch.users !== 'none' ) {
//           usersArr = locationSearch.users ? locationSearch.users.split( ',' ).map( id => +id ) : defaultUserFilters;
//         }

//         if ( locationSearch.status !== 'none' ) {
//           statusArr = locationSearch.status ? locationSearch.status.split( ',' ) : defaultStatusFilters;
//         }

//         activeUserFilters = usersArr;
//         activeStatusFilters = statusArr;
//         updateStatusFilter();
//         updateUserFilter();
//         refresh();
//       }

//       oldSearchParams = angular.copy( locationSearch );
//     } );

//     function updateStatusFilter() {
//       $scope.filters.selected.status = [];
//       activeStatusFilters.forEach( status => {
//         const filter = $scope.filters.options.status.find( f => f.key === status );
//         if ( !filter ) {
//           return;
//         }

//         filter.isSelected = true;
//         $scope.filters.selected.status.push( filter );
//       } );
//     }

//     function updateUserFilter() {
//       $scope.filters.selected.users = [];
//       activeUserFilters.forEach( user => {
//         const filter = $scope.filters.options.users.find( f => f.id === user );
//         if ( !filter ) {
//           return;
//         }

//         filter.isSelected = true;
//         $scope.filters.selected.users.push( filter );
//       } );
//     }

//     function filterSet( value ) {
//       return _.contains( activeStatusFilters, value );
//     };

//     function statusFiltersChanged() {
//       return !( activeStatusFilters.length === 3 && filterSet( 'New' ) && filterSet( 'InProgress' ) && filterSet( 'InConflict' ) );
//     };

//     function refresh() {
//       queryParams.forStatuses = activeStatusFilters.join( ',' );
//       queryParams.forUsers = activeUserFilters.join( ',' );

//       $scope.showResetFilters = statusFiltersChanged() || activeUserFilters.length !== 1 || activeUserFilters.indexOf( user.currentUser.id ) < 0;

//       if ( !$scope.workItems ) {
//         $scope.workItems = WorkItems.query( queryParams );
//       }
//       else {
//         $scope.workItems.requery( queryParams );
//       }

//       $scope.filterActive = activeUserFilters.length || activeStatusFilters.length;
//     }

//     function updateQueryString() {
//       if ( !activeStatusFilters.length ) {
//         $location.search( 'status', 'none' );
//       }
//       else {
//         const statusIsDefault = activeStatusFilters.sort().join( ',' ) === defaultStatusFilters.join( ',' );
//         $location.search( 'status', !statusIsDefault ? activeStatusFilters.join( ',' ) : null );
//       }

//       if ( !activeUserFilters.length ) {
//         $location.search( 'users', 'none' );
//       }
//       else {
//         const usersAreDefault = activeUserFilters.sort().join( ',' ) === defaultUserFilters.join( ',' );
//         $location.search( 'users', !usersAreDefault ? activeUserFilters.join( ',' ) : null );
//       }
//     }
//   }
// } )();