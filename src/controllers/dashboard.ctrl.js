/**
 *
 * @description dashboard控制器
 * @author 吴家荣 <jiarongwu.se@foxmail.com>
 *
 */

angular.module('simpleucp')
  .controller('dashboardCtrl', dashboardCtrl);

dashboardCtrl.$injeect = ['$scope', '$resource', '$pieChartFactory'];

function dashboardCtrl($scope, $resource, $pieChartFactory) {

  // ====== 1 $scope变量初始化 ======
  function initScopeVariable() {
    $scope.images = null;
    $scope.containers = null;
    $scope.nodes = null;
    $scope.stats = null;
  }

  // ====== 2 $rootScope变量初始化 ======
  function initRootScopeVariable() {}

  // ====== 3 $resource变量初始化 ======
  function initResourceVariable() {
    $scope.resource = {};
    $scope.resource.containers = $resource('/api/containers/json');
    $scope.resource.images = $resource('/api/images/json');
    $scope.resource.nodes = $resource('/api/nodes');
    $scope.resource.stats = $resource('/api/stats');
  }

  // ====== 4 页面元素初始化 ======
  function initPageDom() {

  }

  // ====== 5 页面数据初始化 ======
  function initPageData() {
    retrieveImages();
    retrieveContainers();
    retrieveNodes();
    retrieveStats().then(setPieCharts);
  }

  // ====== 6 页面事件初始化 ======
  function initPageEvent() {}

  // ====== 7 controller初始化接口 ======
  function initDashboardCtrl() {

    initScopeVariable();
    initRootScopeVariable();
    initResourceVariable();

    initPageData();
    initPageDom();
    initPageEvent();

  }

  // ====== 8 $scope事件函数定义 ======

  // ====== 9 工具函数定义 ======
  function setPieCharts(result) {
    let cpuUsed = parseFloat(($scope.stats.averagerCpuUsage * 100).toFixed(2));
    let cpuFree = parseFloat(((1 - $scope.stats.averagerCpuUsage) * 100).toFixed(2));
    let cpuUsageTemplate = "<%=value%>% <%=label%>";
    $pieChartFactory.createPieChart('#cpuUsage', cpuUsed, cpuFree, cpuUsageTemplate);

    let memoryFree = $scope.stats.freemem;
    let memoryUsed = $scope.stats.totalmem - memoryFree;
    let memoryUsageTemplate = "<%=value%>G <%=label%>";
    $pieChartFactory.createPieChart('#memoryUsage', memoryUsed, memoryFree, memoryUsageTemplate);

    $scope.cpu = { used: cpuUsed, free: cpuFree };
    $scope.memory = { used: memoryUsed, free: memoryFree };
  }

  // ====== 10 数据访问函数 ======

  function retrieveImages() {
    return $scope.resource.images.get({}, function(result, header) {
      $scope.images = result.data;
    }, function(error) {
      console.log('Error occur:', error);
    }).$promise;
  }

  function retrieveContainers() {
    return $scope.resource.containers.get({all: true}, function(result, header) {
      $scope.containers = result.data;
    }, function(error) {
      console.log('Error occur:', error);
    }).$promise;
  }

  function retrieveNodes() {
    return $scope.resource.nodes.get({}, function(result, header) {
      if (Array.isArray(result.data)) {
        $scope.nodes = result.data;
      } else {
        $scope.nodes = [];
      }
    }, function(error) {
      console.log('Error occur:', error);
    }).$promise;
  }

  function retrieveStats(id) {
    return $scope.resource.stats.get({}, function(result) {
      $scope.stats = result.data;
      let freemem = $scope.stats.freemem / (1024 * 1024 * 1024);
      let totalmem = $scope.stats.totalmem / (1024 * 1024 * 1024);
      $scope.stats.freemem = parseFloat(freemem.toFixed(3));
      $scope.stats.totalmem = parseFloat(totalmem.toFixed(3));

      let perCpuUsage = $scope.stats.cpus.map((item) => {
        let total = 0;
        for (let k in item.times) total += item.times[k];
        return (item.times.user + item.times.sys) / total;
      });

      let averagerCpuUsage = perCpuUsage.reduce((previousValue, currentValue, index, array) => {
        return previousValue + currentValue;
      }, 0) / $scope.stats.cpus.length;

      $scope.stats.averagerCpuUsage = parseFloat(averagerCpuUsage.toFixed(4));
    }, function(error) {
      console.log('Error occur:', error);
    }).$promise;
  }

  // ====== 11 初始化函数执行 ======
  initDashboardCtrl();
}
