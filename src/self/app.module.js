/**
 *
 * @description 应用层模块
 *
 */

angular
  .module('simpleucp', [
    'ui.router'
  ]);

/**
 *
 * @description 引导ng-app
 *
 */
angular.element(document).ready(function() {
  angular.bootstrap(document, ['simpleucp']);
});
