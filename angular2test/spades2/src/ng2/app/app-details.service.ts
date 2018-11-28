import { Injectable } from '@angular/core';

@Injectable()
export class AppDetailsService {
  public version: '5.1.0.0';
  public edition: '5.1.0.0';
  public customerName: '';
  public customerVersion: '5.1.0.0';

  constructor() { }
}
