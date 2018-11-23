import { Component, OnInit, Inject } from '@angular/core';

@Component( {
  selector: 'ng2-demo',
  template: `
    <h3>Angular 2 Demo Component</h3>
    <p>
      {{phones.length}} Phones found.
    </p>
  `
} )

export class Ng2DemoComponent implements OnInit {

  phones: any[] = [];

  constructor() {
  }

  ngOnInit() {
  }
}
