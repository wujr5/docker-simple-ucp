/**
 *
 * @description 应用层模块
 *
 */

angular
  .module('simpleucp', [
    'ui.router',
    'ngResource'
  ]);

/**
 *
 * @description 引导ng-app
 *
 */
angular.element(document).ready(function() {
  angular.bootstrap(document, ['simpleucp']);
  setTimeout(function() {
    $('.content-wrapper')
      .css('min-height', $('body').height() - 101)
      .addClass('content-wrapper-show');
  }, 500);
});
