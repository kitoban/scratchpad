'use strict';

function appDetails() {
  return {
    version: '1.0.0.0',
    edition: '1.0.0.0',
    customerName: '',
    customerVersion: '1.0.0.0',
  }
}

angular.module('ace').factory( 'appDetails', appDetails );
