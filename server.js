/**
 *
 * @description 服务端脚本，监听3000端口，并且代理到unix-socket进程，间接运行docker命令，并取得结果，返回给前端, docker remote api文档：https://docs.docker.com/engine/reference/api/docker_remote_api/, v1.24版本API: https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/
 *
 * @author 吴家荣 <jiarongwu.se@foxmail.com>
 *
 */

const http = require('http');
const exec = require('child_process').exec;
const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const os = require('os');



app.use(express.static(__dirname + '/public'));
app.use(compression());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y',
  setHeaders (res, path) {
    if (mime.lookup(path) === 'text/html' || process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/html/views/app.view.html');
});

app.get('/api/stats', function(req, res) {
  let cpus = os.cpus();
  let freemem = os.freemem();
  let totalmem = os.totalmem();
  res.json({ data: { cpus, freemem, totalmem } });
});

app.all('/api/*', function(req, res) {
  proxyToUnixSocket(req, res);
});

app.listen(3000, function() {
  console.log('Server starts, listening on port 3000');
});

function proxyToUnixSocket(req, res)    {
  let url = req.originalUrl.substr(4);
  let method = req.method;
  let data = JSON.stringify(req.body);
  let command = '';

  if (method === 'GET') {
    command = `curl --unix-socket /var/run/docker.sock http:${url}`;
  } else {
    data = '{"Image":"wujr5/ubuntu:1016"}';
    command = `curl --unix-socket /var/run/docker.sock http:${url} -X POST -H 'Content-Type: application/json' --data '${data}'`;
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.json({ message: 'execute error' });
    } else {
      if (typeof stdout === 'string') {
        res.json({ data: JSON.parse(stdout) });
      }
      else if (typeof stdout === 'object') {
        res.json({ data: stdout });
      } else {
        res.json({ message: 'unknow error' });
      }
    }
  });
}
