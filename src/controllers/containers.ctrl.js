/**
 *
 * @description containers控制器
 * @author 吴家荣 <jiarongwu.se@foxmail.com>
 *
 */

angular.module('simpleucp')
  .controller('containersCtrl', containersCtrl);

containersCtrl.$injeect = ['$scope', '$resource'];

function containersCtrl($scope, $resource) {

  // ====== 1 $scope变量初始化 ======
  function initScopeVariable() {
    $scope.containers = null;
  }

  // ====== 2 $rootScope变量初始化 ======
  function initRootScopeVariable() {}

  // ====== 3 $resource变量初始化 ======
  function initResourceVariable() {
    $scope.resource = {};
    $scope.resource.containers = $resource('/api/containers/json');
  }

  // ====== 4 页面元素初始化 ======
  function initPageDom() {}

  // ====== 5 页面数据初始化 ======
  function initPageData() {
    retrieveContainers();
  }

  // ====== 6 页面事件初始化 ======
  function initPageEvent() {}

  // ====== 7 controller初始化接口 ======
  function initContainersCtrl() {

    initScopeVariable();
    initRootScopeVariable();
    initResourceVariable();

    initPageData();
    initPageDom();
    initPageEvent();

  }

  // ====== 8 $scope事件函数定义 ======

  // ====== 9 工具函数定义 ======

  // ====== 10 数据访问函数 ======
  function retrieveContainers() {
    $scope.resource.containers.get({}, function(result, response) {
      $scope.containers = result.data;
    }, function(error) {
      console.log('Error occur:', error);
    });
  }

  // ====== 11 初始化函数执行 ======
  initContainersCtrl();
}
