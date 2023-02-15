const http = require('http');
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 3000;

const html = 'text/html; charset=utf-8';
//요청에 대한 정작파일을 서비스하는 함수
function serveStaticFile(res, fname){
    fs.readFile(path.join(__dirname,"public",fname),(err,data)=>{
        //파일을 읽다가 오류가 발생하면 경고문 출력
        if(err){
            res.writeHead(500, {'Content-Type':html});
            return res.end('<h1>파일 처리 중 오류 발생');
        }
            res.writeHead(200, {'Content-Type':html});
            res.end(data);
    });
}
//localhost:3000 요청 시 처리, 요청 path 별 처리를 세분화 - routing
//요청 Path: /
//요청 Path: /user
//요청 Path: /about
//그 외 나머지: 404 - 페이지 없음
const server = http.createServer( (req, res)=>{
    switch(req.url){
        case '/':
            serveStaticFile(res, 'index.html');
            break;
        case '/user':
            serveStaticFile(res, 'user.html');
            break;
        case '/about':
            serveStaticFile(res, 'about.html');
            break;
        case '/500':
            serveStaticFile(res, '500.html');
            break;
        default:
            serveStaticFile(res, '404.html');
    }
});

server.listen(port, () =>{
    console.log('서버 실행 중.. 중지하려면 Ctrl + F2를 누르세요.')
});

