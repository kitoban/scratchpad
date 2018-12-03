import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { RouterModule, UrlHandlingStrategy } from '@angular/router';

import { UpgradeModule, downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';
import { AppComponent } from './app.component';
import { Ng2DemoComponent } from "ng2/app/ng2-demo.component";
import { AppDetailsService } from './app-details.service';
import { AngularRouterHookService } from './AngularRouterHook.service'
import { AppPageFooterComponent } from './app.page.footer';
import { EmptyComponent } from './empty.component'
import { BodyService } from './body.service';

declare var angular: any;

export class CustomHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url) {
    return url.toString().startsWith("/ng2-route") || url.toString() == "/"
  }
  extract(url) { return url; }
  merge(url, whole) { return url; }
}

angular.module('ace').directive(
  'ng2Demo',
  downgradeComponent({component: Ng2DemoComponent})
);

angular.module('ace').factory(
  'angularRouterHook',
  downgradeInjectable(AngularRouterHookService)
);

angular.module('ace').factory(
  'bodyService',
  downgradeInjectable(BodyService)
);

@NgModule({
  declarations: [
    AppComponent,
    Ng2DemoComponent,
    AppPageFooterComponent,
    EmptyComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'ng2-route' },
      { path: 'ng2-route', component: Ng2DemoComponent },
      { path: '**', component: EmptyComponent }
    ],
    {
      useHash: false,
      enableTracing: false
    }
    )
  ],
  entryComponents: [
    Ng2DemoComponent // Don't forget this!!!
  ],
  providers: [
    AppDetailsService,
    AngularRouterHookService,
    Title,
    BodyService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

