import { Component, Inject } from '@angular/core';
import { APP_DETAILS } from './AppDetails';

@Component( {
  selector: 'app-page-footer',
  templateUrl: './app-page-footer.html',
  styleUrls: ['./app-page-footer.less']
} )

export class AppPageFooterComponent {

  year = new Date().getFullYear();

  constructor( @Inject( APP_DETAILS ) private appDetails: any ) {
  }
}
