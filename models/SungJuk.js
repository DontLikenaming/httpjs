const oracledb = require('../models/Oracle');

class SungJuk {
    // 생성자 정의 - 변수 초기화
    constructor(name, kor, eng, mat) {
        kor = parseInt(kor);
        eng = parseInt(eng);
        mat = parseInt(mat);
        let tot = (kor+eng+mat);
        let avg = Math.round( ((kor+eng+mat)/3)*10)/10;
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
        this.name = name;
        this.kor = kor;
        this.eng = eng;
        this.mat = mat;
        this.tot = tot;
        this.avg = avg;
        this.grd = grade(avg);
    }
    //성적 저장
    async insert(){
        let conn = null;
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

        try{
            conn = await oracledb.makeConn();
            params = [this.name, this.kor, this.eng, this.mat, this.tot, this.avg, this.grd];

            /*let result = await conn.execute(sql1);
            await conn.commit();
            console.log(result);

            result = await conn.execute(sql2);
            await conn.commit();
            console.log(result);*/

            let result = await conn.execute(sql3, params);
            await conn.commit();
            console.log(result);

            result = await conn.execute(sql4);
            await conn.commit();
            console.log(result);

        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }
    }
    //성적 전체조회
    select(){}
    //성적 상세조회
    insertOne(sjno){}
}
module.exports = SungJuk;