import { Component, OnInit, Inject } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
} )

export class AppComponent implements OnInit {
  title = 'app';

  constructor(private upgrade: UpgradeModule) { }

  ngOnInit() {
    //this.upgrade.bootstrap(document.body, ['ace']);
  }
}
