const express = require('express');

const SungJuk = require('../models/SungJuk');
/*const app = express();
const path = require('path');*/
const router = express.Router();


//show index page
router.get('/',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../public','index.html'));
    //handlebars 뷰 엔진으로 응답 처리
    res.render('index', {title:'index'});
});

router.get('/sungjuk',(req,res)=>{
    res.render('sungjuk', {title:'성적처리'});
});

router.post('/sungjuk',(req,res,next)=> {
    //폼으로 전송된 데이터들은 req.body, req.body.("폼 이름") 등으로 확인 가능
    //console.log(req.body);
    //console.log(req.body.name, req.body.kor, req.body.eng, req.body.mat);
    let {name, kor, eng, mat} = req.body;
    //console.log(name, kor, eng, mat);

    new SungJuk(name, kor, eng, mat).insert();

    res.redirect(304, '/');
});

router.get('/showsungjuk',async (req,res)=>{
    let sjs = new SungJuk().select().then(async sjs => {return await sjs;});
    console.log(await sjs);
    res.render('showsungjuk', {title:'성적 전체보기', sjs: await sjs});
});

router.get('/viewsungjuk',async (req,res)=>{
    let sjno = req.query.sjno;     //querystring의 매개변수 추출
    let sjs = new SungJuk().insertOne(sjno).then(async sjs => {return await sjs;});
    console.log(await sjs);
    res.render('viewsungjuk', {title:'성적 상세보기', sjs: await sjs});
});

//단순한 그림파일을 화면에 표시하기 위해
//일일이 라우팅 설정하는 것은 번거로움
/*router.get('/eilean.png',(req,res)=>{
    res.sendFile(path.join(__dirname,'../static/img','eilean.png'));
});*/
module.exports = router;
