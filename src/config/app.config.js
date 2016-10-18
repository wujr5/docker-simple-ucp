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

  let applications = {
    name: 'applications',
    url: '/applications',
    templateUrl: '/html/views/applications.view.html'
  };

  let containers = {
    name: 'containers',
    url: '/containers',
    templateUrl: '/html/views/containers.view.html'
  };

  let nodes = {
    name: 'nodes',
    url: '/nodes',
    templateUrl: '/html/views/nodes.view.html'
  };

  let images = {
    name: 'images',
    url: '/images',
    templateUrl: '/html/views/images.view.html'
  };

  let dockerhub = {
    name: 'dockerhub',
    url: '/dockerhub',
    templateUrl: '/html/views/dockerhub.view.html'
  };

  let networks = {
    name: 'networks',
    url: '/networks',
    templateUrl: '/html/views/networks.view.html'
  };

  let users = {
    name: 'users',
    url: '/users',
    templateUrl: '/html/views/users.view.html'
  };

  let settings = {
    name: 'settings',
    url: '/settings',
    templateUrl: '/html/views/settings.view.html'
  };

  $stateProvider
    .state(dashboard)
    .state(containers)
    .state(applications)
    .state(nodes)
    .state(images)
    .state(dockerhub)
    .state(networks)
    .state(users)
    .state(settings);
}
