import { Injectable } from '@angular/core';

@Injectable()
export class AppDetailsService {

  constructor() { }

  public getData(): any {
    return {
      version: '5.1.0.0',
      edition: '5.1.0.0',
      customerName: '',
      customerVersion: '5.1.0.0'
    }
  }
}
