import { Component, Inject } from '@angular/core';
import { UpgradeModule } from "@angular/upgrade/static";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app';

   phones: any[] = [];


   constructor(private upgrade: UpgradeModule) { }

    ngOnInit() {
      this.upgrade.bootstrap(document.body, ['ace']);
    }
}
