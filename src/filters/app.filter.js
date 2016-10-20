/**
 *
 * @description 应用层filter
 * @author 吴家荣 <jiarongwu.se@foxmail.com>
 *
 */

angular.module('simpleucp')
  .filter('idFilter', idFilter)
  .filter('sizeFilter', sizeFilter)
  .filter('dateFilter', dateFilter)
  .filter('repositoryFilter', repositoryFilter)
  .filter('nameFilter', nameFilter)
  .filter('portsFilter', portsFilter);

/**
 *
 * @description images和container的id过滤器
 *
 */

idFilter.$inject = [];
function idFilter() {
  return function(id, type) {
    let pos = 0;
    if (type === 'image') {
      pos = id.indexOf(':') + 1;
    }

    return id.substring(pos, pos + 12);
  };
}

/**
 *
 * @description image大小过滤器
 *
 */

sizeFilter.$inject = [];
function sizeFilter() {
  return function(size) {
    let m = size / (1000 * 1000);
    return m.toFixed(2);
  }
}

/**
 *
 * @description 日期格式过滤器，主要用于images和containers的created字段
 *
 */

dateFilter.$injeect = [];
function dateFilter() {
  return function(date) {
    let jsDate = new Date(parseInt(date) * 1000);

    let year = jsDate.getFullYear();
    let month = jsDate.getMonth() + 1;
    let day = jsDate.getDate();
    let hours = jsDate.getHours();
    let minutes = jsDate.getMinutes();
    let seconds = jsDate.getSeconds();

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };
}

/**
 *
 * @description image仓库数组过滤器
 *
 */

repositoryFilter.$inject = [];
function repositoryFilter() {
  return function(repository, type) {
    if (repository.length === 0) {
      return '<none>';
    }
    else if (type === 'tag') {
      let image = repository[0];
      return image.substr(image.indexOf(':') + 1);
    } else {
      let image = repository[0];
      return image.substring(0, image.indexOf(':'));
    }
  };
}

/**
 *
 * @description container名字过滤器，合并数组字符串
 *
 */

nameFilter.$inject = [];
function nameFilter() {
  return function(names) {
    return names.map( (name) => {
      return name.substr(1);
    }).join(',');
  };
}

/**
 *
 * @description container端口过滤器
 *
 */

portsFilter.$inject = [];
function portsFilter() {
  return function(ports) {
    if (ports.length === 0) {
      return '<none>';
    }
    return ports.map( (port) => {
      if (!port.PublicPort) {
        return `${port.PrivatePort}/${port.Type}`;
      }
      return `${port.IP}:${port.PublicPort}->${port.PrivatePort}/${port.Type}`;
    }).join(',');
  };
}
