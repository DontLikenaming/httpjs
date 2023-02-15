const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//라우팅 설정 : app.요청 메서드(경로, 콜백함수);
const html = 'text/html; charset=utf-8';
function appget(addr,body){
    app.get(addr,(req,res)=>{
        res.type(html);
        res.send(body);
    });
}
appget('/','<h1>index 페이지</h1>')
appget('/user','<h1>user 페이지</h1>')
appget('/user/add','<h1>user 가입 페이지</h1>')
appget('/user/view','<h1>user 상세정보 페이지</h1>')
appget('/about','<h1>about 페이지</h1>')


//라우팅 설정 2 : app.use(경로, 콜백함수);
//app.use()는 요청이 왔을 때 실행할 함수 지정
//404 routing
app.use((req,res)=>{    //경로 부분을 적지 않음으로써 위의 주소가 아닌 나머지는
    res.type(html);              //해당 함수를 실행시키도록 설정
    res.status(404);
    res.send(`<h1>404 - 존재하지 않는 페이지</h1>`);
});


app.listen(port,()=> {
    console.log('익스프레스 서버 실행 중.. 중지하려면 Ctrl + F2를 누르세요.');
});