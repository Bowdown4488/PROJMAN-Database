const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000;
const bodyparser = require('body-parser')
const session = require("express-session")
const mongoose = require("mongoose") 
const cookieparser = require("cookie-parser")
const formidable = require('formidable'); 
const fs = require('fs');
const crypto = require("crypto");
const server = express();   

function userModule(server){
    
server.use(session({
  name: 'User Session',
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7   //Cookie Time
}
}))
    
const urlencoder = bodyparser.urlencoded({
    extended: false
});

server.get('/', function(req, resp){
   resp.render('./pages/index');
});

server.post('/home-page', urlencoder,function(req, resp){
    var user = {type: req.body.type};
    console.log(req.body.type);
    if(user === "ADMIN" || user === "admin"){
            resp.render('./pages/home-page',{type: req.body.type});
    }
    else{
        var user = "edit"
        resp.render('./pages/home-page',{type: req.body.type});
    }
});

    
}

module.exports.Activate = userModule;