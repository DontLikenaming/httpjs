const http = require('http');
const port = process.env.PORT || 3000;

//localhost:3000 요청 시 처리
const server = http.createServer((req, res)=>{
    //응답헤더 작성 : 응답코드, 응답 데이터 형식 지정
    res.writeHead(200, {'content-Type': 'text/plain'});

    //응답 메세지 작성
    res.end('Hello World');

});

server.listen(port, () =>{
    console.log('서버 실행 중.. 중지하려면 Ctrl + F2를 누르세요.')
});

