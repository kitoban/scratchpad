import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'ng2-demo',
  template: `
    <h3 style="color: white">New Home page</h3>
  `
})
export class Ng2DemoComponent implements OnInit {

  phones: any[] = [];

  constructor() {
    }

    ngOnInit() {
    }

}
