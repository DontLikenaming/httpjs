const express = require('express');
/*const app = express();
const path = require('path');*/
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
    kor = parseInt(kor);
    eng = parseInt(eng);
    mat = parseInt(mat);
    console.log(name, kor, eng, mat);

    let grade = (num) =>{
        let result = '';
        switch(true){
            case (num>90): result = '수'; break;
            case (num>80): result = '우'; break;
            case (num>70): result = '미'; break;
            case (num>60): result = '양'; break;
            default: result = '가'; break;
        }
        return result;
    };
    let[tot, avg, grd] = [
        (kor+eng+mat),
        Math.round( ((kor+eng+mat)/3)*10)/10,
        grade(Math.round( (kor+eng+mat)/3))
    ]
    console.log(tot, avg, grd);
    async function main() {
        /*let sql1 = ' create table sungjuk ' +
            ' (sjno number(5), name varchar(15), kor number(3), eng number(3), mat number(3), ' +
            ' tot number(3), avg number(10), grd varchar(10), regdata date default current_timestamp) ';
        let sql2 = ' create sequence sjno ';*/
        let sql3 = ' insert into sungjuk (sjno, name, kor, eng, mat, tot, avg, grd) values ' +
            ' (sjno.nextval, :1, :2, :3, :4, :5, :6, :7) ';
        let sql4 = ' select * from sungjuk ';
        let params = [];
        let options = {
            resultSet: true,
            outFormat: oracledb.OUT_FORMAT_OBJECT
        };
        let conn = null;

        try {
            oracledb.initOracleClient({libdir: 'C:/Java/instantclient_19_17'});
            conn = await oracledb.getConnection(dbconfig);

            /*let result = await conn.execute(sql1);
            await conn.commit();
            console.log(result);

            result = await conn.execute(sql2);
            await conn.commit();
            console.log(result);*/

            params = [name, kor, eng, mat, tot, avg, grd];
            result = await conn.execute(sql3, params);
            await conn.commit();
            console.log(result);

            result = await conn.execute(sql4);
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

    res.redirect(304, '/');
});
//단순한 그림파일을 화면에 표시하기 위해
//일일이 라우팅 설정하는 것은 번거로움
/*router.get('/eilean.png',(req,res)=>{
    res.sendFile(path.join(__dirname,'../static/img','eilean.png'));
});*/
module.exports = router;
