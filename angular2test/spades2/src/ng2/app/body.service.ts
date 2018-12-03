import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationError } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable()
export class BodyService {
  VAR1 = 'value1';
  VAR2 = 'value2';

  constructor(router: Router, titleService: Title) {
    router.events.subscribe((evt) => {
      if (evt instanceof  NavigationEnd) {
        titleService.setTitle( evt.url );
      }
    } );

  }


  // $scope.$on( 'sitemap:pageChangeSuccess', function() {
  //   if (!$routeParams.wi) {
  //     return;
  //   }

  //   if ($route.current.isHome) {
  //     $window.document.title = windowTitle;
  //     return;
  //   }

  //   windowTitlePrefix = ($routeParams.wi !== 'none' && $route.current.showWorkItemPicker) ? '[' + $routeParams.wi + '] ' : '';

  //   if (sitemap.currentPage) {
  //     $scope.page.icon = sitemap.currentPage.icon;

  //     var page = sitemap.currentPage;

  //     $window.document.title = windowTitlePrefix + page.parentTitle + page.pageTitle + windowTitleSuffix;
  //   }
  //   else {
  //     $window.document.title = windowTitlePrefix + windowTitle;
  //   }

  // } );


}
