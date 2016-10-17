/**
 *
 * @description 应用层配置
 * @author 吴家荣 <jiarongwu.se@foxmail.com>
 * 
 */

const simpleucpModule = angular.module('simpleucp');

simpleucpModule.config(simpleucpModuleConfig);

simpleucpModuleConfig.$inject = ['$stateProvider'];

function simpleucpModuleConfig($stateProvider) {
  var helloState = {
    name: 'hello',
    url: '/hello',
    template: '<h3>hello world!</h3>'
  };

  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  };

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
}