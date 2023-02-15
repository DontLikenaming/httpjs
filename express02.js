const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const aboutRouter = require('./routes/about');


//index에 대한 route handler 지정
app.use('/',indexRouter);
app.use('/user',userRouter);
app.use('/about',aboutRouter);

app.listen(port,()=> {
    console.log('익스프레스 서버 실행 중.. 중지하려면 Ctrl + F2를 누르세요.');
});