"use strict";

var http = require('http');

var querystring = require('querystring'); //这个模块是请求丶数据转换为字符串形式


var data = {
  title: 'fontend',
  password: '123456'
};
var server = http.createServer(function (request, response) {
  console.log(response.request); // if (request.url === '/') {
  // }

  var postData = '';
  request.on('data', function (chunk) {
    //意思为绑定一个data事件，这个为事件体
    //   将数据累加到容器里，// 这个事件里面就把这些小块的数据拼接起来
    postData += chunk;
  });
  request.on('end', function () {
    console.log(postData); //username=admin&&psssword=1234
    //4利用解析这个传递过来的参数数据，形成一个对象

    var postObj = querystring.parse(postData);
    console.log(postObj); //{username:'admin',password:'"1234"}

    response.end(JSON.stringify(postObj));
  });
});
server.listen(4000, function () {
  console.log('The server is running at http://localhost:4000');
});