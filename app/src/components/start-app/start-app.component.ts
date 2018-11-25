import * as angular from 'angular';

/**
 * @ngInject
 */
export class AppComponent {
  // Define our AppComponent's name
  static componentName:string = "mcApp";

  private date1: string = moment().format('YYYY-MM-DD');
  private date2: string = moment().format('YYYY-MM-DD');

  // Define our AppComponent's config
  static componentConfig:ng.IComponentOptions = {
    bindings: {},
    controller: AppComponent,
    controllerAs: 'vm',
    templateUrl: 'src/components/start-app/start-app.component.html'
  };

  // Define our constructor and inject the necessary services
  constructor() {
  }

  private mcChange(dateFrom, dateTo) {
    console.log('mc.change', dateFrom, dateTo);
    alert(`Dates: ${dateFrom} ${dateTo}`);
  }
}
