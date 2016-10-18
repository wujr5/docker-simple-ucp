/**
 *
 * @description dashboard控制器
 * @author 吴家荣 <jiarongwu.se@foxmail.com>
 *
 */

angular.module('simpleucp')
  .controller('dashboardCtrl', dashboardCtrl);

dashboardCtrl.$injeect = ['$scope', '$resource'];

function dashboardCtrl($scope, $resource) {

  // ====== 1 $scope变量初始化 ======
  function initScopeVariable() {
  }

  // ====== 2 $rootScope变量初始化 ======
  function initRootScopeVariable() {}

  // ====== 3 $resource变量初始化 ======
  function initResourceVariable() {
    $scope.resource = {};
    $scope.resource.stats = $resource('/api/stats');
  }

  // ====== 4 页面元素初始化 ======
  function initPageDom() {
    let cupUsageChartCanvas = $("#cpuUsage").get(0).getContext("2d");
    let memoryUsageChartCanvas = $("#memoryUsage").get(0).getContext("2d");

    let cupUsagePieChart = new Chart(cupUsageChartCanvas);
    let memoryUsagPieChart = new Chart(memoryUsageChartCanvas);

    let cupUsagePieData = [
      {
        value: 30,
        color: "#f56954",
        highlight: "#f56954",
        label: "Usage"
      },
      {
        value: 70,
        color: "#00a65a",
        highlight: "#00a65a",
        label: "Free"
      }
    ];

    let memoryUsagePieData = [
      {
        value: 40,
        color: "#f56954",
        highlight: "#f56954",
        label: "Usage"
      },
      {
        value: 60,
        color: "#00a65a",
        highlight: "#00a65a",
        label: "Free"
      }
    ];

    let pieOptions = {
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke: true,
      //String - The colour of each segment stroke
      segmentStrokeColor: "#fff",
      //Number - The width of each segment stroke
      segmentStrokeWidth: 1,
      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout: 50, // This is 0 for Pie charts
      //Number - Amount of animation steps
      animationSteps: 100,
      //String - Animation easing effect
      animationEasing: "easeOutBounce",
      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate: true,
      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale: false,
      //Boolean - whether to make the chart responsive to window resizing
      responsive: true,
      // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio: false,
      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
      //String - A tooltip template
      tooltipTemplate: "<%=value%>% <%=label%>"
    };

    cupUsagePieChart.Doughnut(cupUsagePieData, pieOptions);
    memoryUsagPieChart.Doughnut(memoryUsagePieData, pieOptions);
  }

  // ====== 5 页面数据初始化 ======
  function initPageData() {
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

  // ====== 10 数据访问函数 ======
  function retrieveStats() {
    $scope.resource.stats.get({}, function(result, header) {
      console.log(result);
    }, function(error) {
      console.log('Error occur:', error);
    });
  }

  // ====== 11 初始化函数执行 ======
  initDashboardCtrl();
}
