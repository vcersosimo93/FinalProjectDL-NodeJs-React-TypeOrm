const express = require ('express');
const axios = require ('axios');

const app = express ();

app.post('/form-submit',(req,res)=>{
    res.send(req.body);
})