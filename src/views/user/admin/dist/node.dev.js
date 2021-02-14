"use strict";

// server1.js 代理服务器(http://localhost:3000)
var http = require('http'); // 第一步：接受客户端请求


var server = http.createServer(function (request, response) {
  // 代理服务器，直接和浏览器直接交互，需要设置CORS 的首部字段
  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  }); // 第二步：将请求转发给服务器

  var proxyRequest = http.request({
    host: '192.168.1.101',
    port: 4000,
    url: '/',
    method: request.method,
    headers: request.headers
  }, function (serverResponse) {
    // 第三步：收到服务器的响应
    var body = '';
    serverResponse.on('data', function (chunk) {
      body += chunk;
    });
    serverResponse.on('end', function () {
      console.log('The data is ' + body); // 第四步：将响应结果转发给浏览器

      response.end(body);
    });
  }).end();
});
server.listen(3000, function () {
  console.log('The proxyServer is running at http://localhost:3000');
});