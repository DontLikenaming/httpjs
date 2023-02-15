const express = require('express');
const path = require('path');
const logger = require('morgan');   //로그 출력기
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const aboutRouter = require('./routes/about');

const app = express();
const port = process.env.PORT || 3000;

//라우팅 거치지 않고 직접 호출해서 응답
app.use(express.static(path.join(__dirname,'static')));

app.use(logger('dev'));

//index에 대한 route handler 지정
app.use('/',indexRouter);
app.use('/user',userRouter);
app.use('/about',aboutRouter);

//404 처리
app.use((req,res)=>{
    res.status(404);
    res.sendFile(path.join(__dirname,'public','404.html'));
});

//500 처리
app.use((err,req,res,next)=>{
    res.status(500);
    res.sendFile(path.join(__dirname,'public','500.html'));
});

app.listen(port,()=> {
    console.log('익스프레스 서버 실행 중.. 중지하려면 Ctrl + F2를 누르세요.');
});