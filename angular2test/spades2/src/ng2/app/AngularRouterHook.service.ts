import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AngularRouterHookService {

  constructor(private router: Router ) { }

  public navigateByUrl( url, extras ): any {
    return this.router.navigateByUrl( url, extras );
  }
}
