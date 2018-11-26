import { InjectionToken } from '@angular/core';

export const APP_DETAILS = new InjectionToken<any>('APP_DETAILS');

export function createAppDetailsProvider(i) {
  return i.get('appDetails');
}

export const appDetailsProviderProvider = {
  provide: APP_DETAILS,
  useFactory: createAppDetailsProvider,
  deps: ['$injector']
};
