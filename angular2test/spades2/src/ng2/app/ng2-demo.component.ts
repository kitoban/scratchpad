import { Component, OnInit, Inject } from '@angular/core';
import { BodyService } from './body.service';

@Component({
  selector: 'ng2-demo',
  template: `
    <h3 style="color: white">New Home page: {{body.VAR1}}</h3>
  `
})
export class Ng2DemoComponent implements OnInit {

  phones: any[] = [];

  constructor( private body: BodyService) {
    }

    ngOnInit() {
    }

}
