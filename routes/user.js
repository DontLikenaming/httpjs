const express = require('express');
const router = express.Router();
const html = 'text/html; charset=utf-8';

router.get('/',(req,res)=>{
    res.type(html);
    res.end('<h1>user 페이지</h1>');
});

router.get('/add',(req,res)=>{
    res.type(html);
    res.end('<h1>user 가입 페이지</h1>');
});

router.get('/view',(req,res)=>{
    res.type(html);
    res.end('<h1>user 상세정보 페이지</h1>');
});
module.exports = router;