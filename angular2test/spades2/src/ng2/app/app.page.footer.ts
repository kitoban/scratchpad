import { Component, Inject, OnInit } from '@angular/core';
import { AppDetailsService } from './app-details.service';

@Component( {
  selector: 'app-page-footer',
  templateUrl: './app-page-footer.html',
  styleUrls: ['./app-page-footer.less']
} )

export class AppPageFooterComponent implements OnInit {

  public appDetails: any;

  year = new Date().getFullYear();

  constructor( private appDetailsService: AppDetailsService ) {
  }

  ngOnInit(): void {
    this.appDetails = this.appDetailsService.getData();
  }
}
