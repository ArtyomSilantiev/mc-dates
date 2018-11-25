import angular = require('angular');

const DATE_FORMAT = 'YYYY-MM-DD';

/**
 * MC Dates Component
 *
 * @constructor
 * @ngInject
 */
export class McDatesComponent {
  // Define our user-details component's name
  static componentName:string = "mcDates";

  // Define our user-details component's component config
  static componentConfig: ng.IComponentOptions = {
    bindings: {
      dateFrom: '<',
      dateTo: '<',
      mcChange: '&'
    },
    controller: McDatesComponent,
    controllerAs: 'vm', 
    templateUrl: 'src/components/mc-dates/mc-dates.component.html'
  };

  // component controller

  private dateFrom: string;
  private modelDateFrom: string;
  private dateTo: string;
  private modelDateTo: string;
  private mcChange: Function;

  constructor($scope: ng.IScope) {
    let self = this;

    $scope.$watch(() => self.dateFrom, (newDateFrom) => {
      self.setDateFrom(newDateFrom, false);
    });

    $scope.$watch(() => self.dateTo, (newDateTo) => {
      self.setDateTo(newDateTo, false);
    });
  }

  private clearDates() {
    this.setDateFrom(null, false);
    this.setDateTo(null, false);
  }

  private setYesterday() {
    console.log('setYesterday');
    let date = moment().subtract(1, 'day').toDate();
    this.clearDates();
    this.setDateFrom(date, false);
    this.setDateTo(date, true);
  }

  private setToday() {
    console.log('setToday');
    let date = moment().toDate();
    this.clearDates();
    this.setDateFrom(date, false);
    this.setDateTo(date, true);
  }

  private setTwoWeeks() {
    console.log('setTwoWeeks');
    this.clearDates();
    this.setDateFrom(moment().subtract(14, 'day').toDate(), false);
    this.setDateTo(moment().toDate(), true);
  }

  private setMonth() {
    console.log('setMonth');
    this.clearDates();
    this.setDateFrom(moment().subtract(30, 'day').toDate(), false);
    this.setDateTo(moment().toDate(), true);
  }

  private setAll() {
    console.log('setAll');
    this.setDateFrom(null, false);
    this.setDateTo(null, true);
  }

  private setDateFrom(newDateFrom, isInComp) {
    console.log('newDateFrom', newDateFrom);

    if (typeof newDateFrom === 'undefined') {
      return;
    }

    let dateFrom = newDateFrom ? moment(moment(newDateFrom).format(DATE_FORMAT)) : null;
    let dateTo = this.modelDateTo ? moment(moment(this.modelDateTo).format(DATE_FORMAT)) : null;

    if (dateFrom && dateFrom.isValid()) {
      if (dateTo && dateTo.isValid() && dateFrom.isAfter(dateTo)) {
        this.modelDateFrom = null;
      } else {
        this.dateFrom = dateFrom.format(DATE_FORMAT);
        this.modelDateFrom = this.dateFrom;
      }
    } else {
      this.modelDateFrom = null;
    }

    if (isInComp && this.mcChange) {
      this.mcChange({
        $dateFrom: dateFrom ? dateFrom.format(DATE_FORMAT) : null,
        $dateTo: dateTo ? dateTo.format(DATE_FORMAT) : null
      });
    }
  }

  private setDateTo(newDateTo, isInComp) {
    console.log('newDateTo', newDateTo);

    if (typeof newDateTo === 'undefined') {
      return;
    }

    let dateFrom = this.modelDateFrom ? moment(moment(this.modelDateFrom).format(DATE_FORMAT)) : null;
    let dateTo = newDateTo ? moment(moment(newDateTo).format(DATE_FORMAT)) : null;

    if (dateTo && dateTo.isValid()) {
      if (dateFrom && dateFrom.isValid && dateTo.isBefore(dateFrom)) {
        console.log(dateFrom, dateTo)
        this.modelDateTo = null;
      } else {
        this.dateTo = dateTo.format(DATE_FORMAT);
        this.modelDateTo = this.dateTo;
      }
    } else {
      this.modelDateTo = null;
    }

    if (isInComp && this.mcChange) {
      this.mcChange({
        $dateFrom: dateFrom ? dateFrom.format(DATE_FORMAT) : null,
        $dateTo: dateTo ? dateTo.format(DATE_FORMAT) : null
      });
    }
  }
}