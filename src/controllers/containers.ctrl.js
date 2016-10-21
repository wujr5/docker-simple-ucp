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
    $scope.searchText = '';
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
  function containersMapper(item) {
    let newItem = {};
    newItem.Id = item.Id.substring(0, 12);
    newItem.Image = item.Image;
    newItem.Command = item.Command;
    newItem.Created = getFormatDate(item.Created);
    newItem.Status = item.Status;
    newItem.Ports = getContainerPorts(item.Ports);
    newItem.Names = getContainerNames(item.Names);

    return newItem;
  }

  function getFormatDate(date) {
    let jsDate = new Date(parseInt(date) * 1000);

    let year = jsDate.getFullYear();
    let month = jsDate.getMonth() + 1;
    let day = jsDate.getDate();
    let hours = jsDate.getHours();
    let minutes = jsDate.getMinutes();
    let seconds = jsDate.getSeconds();

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }

  function getContainerPorts(ports) {
    if (ports.length === 0) {
      return '<none>';
    }
    return ports.map( (port) => {
      if (!port.PublicPort) {
        return `${port.PrivatePort}/${port.Type}`;
      }
      return `${port.IP}:${port.PublicPort}->${port.PrivatePort}/${port.Type}`;
    }).join(',');
  }

  function getContainerNames(names) {
    return names.map( (name) => {
      return name.substr(1);
    }).join(',');
  }

  // ====== 10 数据访问函数 ======
  function retrieveContainers() {
    $scope.resource.containers.get({ all: 1 }, function(result, response) {
      console.log(result.data[0]);
      $scope.containers = result.data.map(containersMapper);
      console.log($scope.containers);
    }, function(error) {
      console.log('Error occur:', error);
    });
  }

  // ====== 11 初始化函数执行 ======
  initContainersCtrl();
}
