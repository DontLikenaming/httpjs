const express = require('express');
const path = require('path');
const router = express.Router();


//show index page
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public','index.html'));
});
//단순한 그림파일을 화면에 표시하기 위해
//일일이 라우팅 설정하는 것은 번거로움
/*router.get('/eilean.png',(req,res)=>{
    res.sendFile(path.join(__dirname,'../static/img','eilean.png'));
});*/
module.exports = router;
