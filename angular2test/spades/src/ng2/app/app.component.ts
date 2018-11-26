import { Component } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
} )

export class AppComponent {
  title = 'app';


  // constructor(private upgrade: UpgradeModule) { }

  // ngDoBootstrap() {
  //   this.upgrade.bootstrap(document.body, ['ace']);
  // }
}
