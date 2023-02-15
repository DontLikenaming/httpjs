const http = require('http');
const path = require("path");
const port = process.env.PORT || 3000;

//localhost:3000 요청 시 처리, 요청 path 별 처리를 세분화 - routing
//요청 Path: /

//요청 Path: /user
//요청 Path: /about
//그 외 나머지: 404 - 페이지 없음
const html = 'text/html; charset=utf-8';
const server = http.createServer((req, res)=>{
    switch(req.url){
        case '/':
            res.writeHead(200, {'Content-Type':html});
            res.end('<h1>index 페이지입니다.</h1>');
            break;
        case '/user':
            res.writeHead(200, {'Content-Type':html});
            res.end('<h1>user 페이지입니다.</h1>');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type':html});
            res.end('<h1>about 페이지입니다.</h1>');
            break;
        default:
            res.writeHead(404, {'Content-Type':html});
            res.end('<h1>페이지 없음</h1>');
    }
});

server.listen(port, () =>{
    console.log('서버 실행 중.. 중지하려면 Ctrl + F2를 누르세요.')
});

