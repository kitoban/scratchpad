'use strict';

function appDetails() {
  return {
    version: '5.1.0.0',
    edition: '5.1.0.0',
    customerName: '',
    customerVersion: '5.1.0.0',
  }
}

angular.module('ace').factory( 'appDetails', appDetails );
