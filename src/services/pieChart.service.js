/**
 *
 * @description 生成可视化pie chart服务
 * @author 吴家荣 <jiarongwu.se@foxmail.com>
 *
 */

angular.module('simpleucp')
  .factory('$pieChartFactory', pieChartFactory);

pieChartFactory.$inject = [];
function pieChartFactory() {
  return {
    createPieChart(id, usage, free, tooltipTemplate) {
      let canvas = $(id).get(0).getContext("2d");
      let pieChart = null;
      try {
        pieChart = new Chart(canvas);
      } catch (e) {
        throw new Error('Chart未定义');
      }
      let data = getPieChartData(usage, free);
      let options = getPieChartOptions(tooltipTemplate);
      pieChart.Doughnut(data, options);
    }
  };
}

/**
 *
 * @description 取得饼图的数据数组
 *
 */

function getPieChartData(usage, free) {
  return [
    {
      value: usage,
      color: "#f56954",
      highlight: "#f56954",
      label: "Usage"
    },
    {
      value: free,
      color: "#00a65a",
      highlight: "#00a65a",
      label: "Free"
    }
  ];
}

/**
 *
 * @description 取得饼图的配置数据
 *
 */

function getPieChartOptions(tooltipTemplate) {
  if (!tooltipTemplate) tooltipTemplate = "<%=value%>% <%=label%>";
  let pieOptions = {
    segmentShowStroke: true,
    segmentStrokeColor: "#fff",
    segmentStrokeWidth: 1,
    percentageInnerCutout: 50, // This is 0 for Pie charts
    animationSteps: 100,
    animationEasing: "easeOutBounce",
    animateRotate: true,
    animateScale: false,
    responsive: true,
    maintainAspectRatio: false,
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
    tooltipTemplate
  };
  return pieOptions;
}
