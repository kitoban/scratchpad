import { Directive, ElementRef, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, UrlHandlingStrategy } from '@angular/router';
import { Ng2DemoComponent } from './ng2-demo.component';
import { UpgradeModule, downgradeComponent, UpgradeComponent } from '@angular/upgrade/static';
import { AppComponent } from './app.component';
import { AppPageFooterComponent } from './app.page.footer';
import { appDetailsProviderProvider } from './AppDetails';

declare var angular: any;

export class CustomHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url) {
    return /*url.toString().startsWith( '/wi' ) ||*/ url.toString().startsWith( '/ng2-route' ) || url.toString() === '/';
  }

  extract(url) {
    return url;
  }

  merge(url, whole) {
    return url;
  }
}

angular.module('ace').directive(
  'appRoot',
  downgradeComponent({ component: AppComponent })
).directive(
  'ng2Demo',
  downgradeComponent({ component: Ng2DemoComponent })
).directive(
  'appPageFooter',
  downgradeComponent({ component: AppPageFooterComponent })
);

// @Directive({
//   selector: 'work-item-list'
// })
// export class WorkItemListDirective extends UpgradeComponent {
//   constructor(elementRef: ElementRef, injector: Injector) {
//     super('workItemList', elementRef, injector);
//   }
// }

@NgModule({
  declarations: [
    AppComponent,
    Ng2DemoComponent,
    AppPageFooterComponent,
    //WorkItemListDirective
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'ng2-route'
      },
      {
        path: 'ng2-route',
        component: Ng2DemoComponent
      },
      // {
      //   path: 'wi',
      //   component: WorkItemListDirective
      // }
    ],
      {
        useHash: true,
        enableTracing: true
      }
    )
  ],
  entryComponents: [
    AppComponent,
    //WorkItemListDirective,
    Ng2DemoComponent // Don't forget this!!!
  ],
  providers: [
    appDetailsProviderProvider,
    { provide: UrlHandlingStrategy, useClass: CustomHandlingStrategy }
  ],
  //bootstrap: [AppComponent]
} )

export class AppModule {
  constructor(private upgrade: UpgradeModule) { }

  ngDoBootstrap() {
    //setAngularJSGlobal(angular);
    this.upgrade.bootstrap(document.body, ['ace']);
  }
}
