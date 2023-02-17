const oracledb = require('../models/Oracle');

class SungJuk {

    insertsql = ' insert into sungjuk (sjno, name, kor, eng, mat, tot, avg, grd) values ' +
        ' (sjno.nextval, :1, :2, :3, :4, :5, :6, :7) ';
    selectsql = ` select sjno, name, kor, eng, mat, to_char(REGDATA, 'yyyy-mm-dd') regdate from sungjuk order by sjno desc `;
    selectOnesql = ` select sjno, name, kor, eng, mat, tot, avg, grd, to_char(REGDATA, 'yyyy-mm-dd hh-mi-ss') regdate from sungjuk where sjno = :1 `;

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

        let params = [];

        try{
            conn = await oracledb.makeConn();
            params = [this.name, this.kor, this.eng, this.mat, this.tot, this.avg, this.grd];

            /*let result = await conn.execute(sql1);
            await conn.commit();
            console.log(result);

            result = await conn.execute(sql2);
            await conn.commit();
            console.log(result);*/

            let result = await conn.execute(this.insertsql, params);
            await conn.commit();
            console.log(result);

        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }
    }
    //성적 전체조회
    async select(){
        let conn = null;
        let result = null;
        let sjs = [];
        let options = {
            resultSet: true,
            outFormat: oracledb.OUT_FORMAT_OBJECT
        };

        try{
            conn = await oracledb.makeConn();

            result = await conn.execute(this.selectsql, [], options);
            await conn.commit();
            let rs = result.resultSet;
            let row = null;
            while(row = await rs.getRow()){
                let sj = new SungJuk(row[1], row[2], row[3], row[4]);
                sj.sjno = row[0];
                sj.regdate = row[5];
                sjs.push(sj);
            }
        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }

        return await sjs;
    }
    //성적 상세조회
    async insertOne(sjno){
        let conn = null;
        let result = null;
        let sjs = [];
        let options = {
            resultSet: true,
            outFormat: oracledb.OUT_FORMAT_OBJECT
        };

        try{
            conn = await oracledb.makeConn();

            result = await conn.execute(this.selectOnesql, [sjno], options);
            await conn.commit();
            let rs = result.resultSet;
            let row = null;
            while (row = await rs.getRow()){
                let js = new SungJuk(row[1],row[3],row[3],row[4],row[5],row[6],row[7]);
                js.sjno = row[0];
                js.regdate = row[8];
                sjs.push(js);
            }
        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }

        return await sjs;
    }
}
module.exports = SungJuk;