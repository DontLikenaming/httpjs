const express = require('express');
const app = express();
const path = require('path');
const oracledb = require("oracledb");
const dbconfig = require("../dbconfig");
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

router.post('/sungjuk',(req,res,next)=>{
    //폼으로 전송된 데이터들은 req.body, req.body.("폼 이름") 등으로 확인 가능
    console.log(req.body);
    //console.log(req.body.name, req.body.kor, req.body.eng, req.body.mat);
    let {name, kor, eng, mat} = req.body;
    //console.log(name, kor, eng, mat);

    //성적처리
    const oracledb = require("oracledb");
    const dbconfig = require("./dbconfig");

    console.log("test");
    let grade = (num) =>{
        let result = '';
        switch(true){
            case (num>90): result = '수'; break;
            case (num>80): result = '우'; break;
            case (num>70): result = '미'; break;
            case (num>60): result = '양'; break;
            case (num>50): result = '가'; break;
        }
        return result;
    };
    let[tot, avg, grd] = [
        (parseInt(kor)+parseInt(eng)+parseInt(mat)),
        Math.round((parseInt(kor)+parseInt(eng)+parseInt(mat))/3),
        grade(Math.round((parseInt(kor)+parseInt(eng)+parseInt(mat))/3))
    ]
    async function main() {
        let sql1 = " create table sungjuk (name varchar(100), kor number(3), eng number(3), mat number(3), tot number(3), avg number(3), grd varchar(10)) ";
        let sql2 = "insert into sungjuk values (:1, :2, :3, :4, :5, :6, :7)";
        let params = [];
        let options = {
            resultSet: true,
            outFormat: oracledb.OUT_FORMAT_OBJECT
        };
        let conn = null;

        try {
            oracledb.initOracleClient({libdir: 'C:/Java/instantclient_19_17'});
            conn = await oracledb.getConnection(dbconfig);

            let result = await conn.execute(sql1, params);
            await conn.commit();
            console.log(result);

            params = [name, kor, eng, mat, tot, avg, grd];
            result = await conn.execute(sql2, params);
            await conn.commit();
            console.log(result);

        }catch (e){console.error(e);}
        finally {
            if(conn){
                try{
                    await conn.close();
                    console.log('오라클 데이터베이스 접속 해제 성공')
                }
                catch (e){console.error(e);}
            }
        }
    }
    main();

    //console.log(tot, avg, grd);
    res.redirect(304, '/');
});
//단순한 그림파일을 화면에 표시하기 위해
//일일이 라우팅 설정하는 것은 번거로움
/*router.get('/eilean.png',(req,res)=>{
    res.sendFile(path.join(__dirname,'../static/img','eilean.png'));
});*/
module.exports = router;
