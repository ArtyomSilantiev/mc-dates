// Import our Angular dependencies
import * as angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-messages';
import 'angular-sanitize';
import 'moment';

import { AppComponent } from './components/start-app/start-app.component.ts';
import { McDatesComponent } from './components/mc-dates/mc-dates.component.ts';

module MaterialStart {
  "use strict";

  // Register our module and it's dependencies
  angular.module('MaterialStart', ['ngMaterial', 'ngSanitize'])
    .config(function (
        $mdIconProvider: angular.material.IIconProvider, 
        $mdThemingProvider: angular.material.IThemingProvider,
        $mdDateLocaleProvider: angular.material.IDateLocaleProvider
      ) {
      // Register the user `avatar` icons
      /*$mdIconProvider
        .defaultIconSet("./assets/svg/*.svg", 128)*/

      $mdThemingProvider.theme('default')
        .primaryPalette('brown')
        .accentPalette('red');

      $mdDateLocaleProvider.formatDate = function(date) {
        let date = moment(date);
        return date.isValid() ? date.format('YYYY-MM-DD') : '';
      };
      
      $mdDateLocaleProvider.parseDate = function(dateString) {
        let m = moment(dateString, 'YYYY-MM-DD', true);
        return m.isValid() ? m.toDate() : '';
      };
    })

    // Register all of our components
    .component(AppComponent.componentName, AppComponent.componentConfig)
    .component(McDatesComponent.componentName, McDatesComponent.componentConfig)
  ;
}