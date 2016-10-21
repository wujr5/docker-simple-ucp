/**
 *
 * @description images控制器
 * @author 吴家荣 <jiarongwu.se@foxmail.com>
 *
 */

angular.module('simpleucp')
  .controller('imagesCtrl', imagesCtrl);

imagesCtrl.$injeect = ['$scope', '$resource'];

function imagesCtrl($scope, $resource) {

  // ====== 1 $scope变量初始化 ======
  function initScopeVariable() {
    $scope.images = null;
    $scope.searchText = '';
    $scope.propertyName = 'repository'
  }

  // ====== 2 $rootScope变量初始化 ======
  function initRootScopeVariable() {}

  // ====== 3 $resource变量初始化 ======
  function initResourceVariable() {
    $scope.resource = {};
    $scope.resource.images = $resource('/api/images/json');
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
  function initImagesCtrl() {

    initScopeVariable();
    initRootScopeVariable();
    initResourceVariable();

    initPageData();
    initPageDom();
    initPageEvent();

  }

  // ====== 8 $scope事件函数定义 ======
  $scope.sortBy = function(name) {

  };

  // ====== 9 工具函数定义 ======
  function imagesMapper(item) {
    let newItem = {};
    let pos =  item.Id.indexOf(':') + 1;
    newItem.Id = item.Id.substring(pos, pos + 12);

    newItem.Size = (item.Size / (1000 * 1000)).toFixed(2);
    newItem.Created = getFormatDate(item.Created);
    newItem.RepoName = getRepoName(item.RepoTags);
    newItem.RepoTag = getRepoTag(item.RepoTags);

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

  function getRepoName(repository) {
    if (repository.length === 0) {
      return '<none>';
    } else {
      let image = repository[0];
      return image.substring(0, image.indexOf(':'));
    }
  }

  function getRepoTag(repository) {
    if (repository.length === 0) {
      return '<none>';
    } else {
      let image = repository[0];
      return image.substr(image.indexOf(':') + 1);
    }
  }

  // ====== 10 数据访问函数 ======
  function retrieveContainers() {
    $scope.resource.images.get({}, function(result, response) {
      $scope.images = result.data.map(imagesMapper);
    }, function(error) {
      console.log('Error occur:', error);
    });
  }

  // ====== 11 初始化函数执行 ======
  initImagesCtrl();
}
