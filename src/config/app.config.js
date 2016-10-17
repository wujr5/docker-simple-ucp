/**
 *
 * @description 应用层配置
 * @author 吴家荣 <jiarongwu.se@foxmail.com>
 *
 */

const simpleucpModule = angular.module('simpleucp');

simpleucpModule.config(simpleucpModuleConfig);

simpleucpModuleConfig.$inject = ['$locationProvider', '$urlRouterProvider', '$stateProvider'];

function simpleucpModuleConfig($locationProvider, $urlRouterProvider, $stateProvider) {

  $locationProvider.html5Mode({
    enabled: false,
    requireBase: true,
    rewriteLinks: true
  });

  $urlRouterProvider.otherwise('dashboard');

  let dashboard = {
    name: 'dashboard',
    url: '/dashboard',
    templateUrl: '/html/views/dashboard.view.html'
  };

  let images = {
    name: 'images',
    url: '/images',
    templateUrl: '/html/views/images.view.html'
  };

  let containers = {
    name: 'containers',
    url: '/containers',
    templateUrl: '/html/views/containers.view.html'
  };

  let dockerhub = {
    name: 'dockerhub',
    url: '/dockerhub',
    templateUrl: '/html/views/dockerhub.view.html'
  };

  $stateProvider
    .state(dashboard)
    .state(images)
    .state(containers)
    .state(dockerhub);
}
