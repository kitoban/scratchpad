import { Component, OnInit } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { BodyService } from './body.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private upgrade: UpgradeModule, private bodyService: BodyService) { }

  ngOnInit() {
    this.upgrade.bootstrap(document.body, ['ace']);
  }
}
