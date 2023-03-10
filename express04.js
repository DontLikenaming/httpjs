const express = require('express');
const path = require('path');
const logger = require('morgan');
const {engine} = require('express-handlebars');
const bodyPaser = require('body-parser');
const oracledb = require('./models/Oracle');

//라우팅 외부 작성
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const aboutRouter = require('./routes/about');


const app = express();
const port = process.env.PORT || 3000;

//view 템플릿 엔진 설정
app.engine('hbs',engine({extname:'.hbs', defaultLayout:'layout',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    },}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

//라우팅 거치지 않고 직접 호출해서 응답
app.use(express.static(path.join(__dirname,'static')));

app.use(logger('dev'));

oracledb.initConn();  //오라클 instant client 초기화

//미들웨어 등록 및 설정
app.use(express.json());
//전송된 폼 데이터에 대한 urlencoding 설정
app.use(express.urlencoded({extended:false}));
app.use(bodyPaser.json());  //전송된 폼 데이터는 json 형식
//app.use(bodyPaser.text());    //enctype이 text/plain일 때 필요(비추)



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
    console.log(err);
    res.status(500);
    res.sendFile(path.join(__dirname,'public','500.html'));
});

app.listen(port,()=> {
    console.log('익스프레스 서버 실행 중.. 중지하려면 Ctrl + F2를 누르세요.');
});