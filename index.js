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

//const fs = require('file-system')//for files
//const multer = require('multer') //for uploading files

server.set('view engine', 'ejs');
server.use(express.static(__dirname + '/public'));
server.set('views', path.join(__dirname, 'views'));

const urlencoder = bodyparser.urlencoded({
    extended: false
});

const controllers = ['user'];
for(var i=0;i<controllers.length;i++){
  const mdl = require('./controller/'+controllers[i]+'Controller');
  mdl.Activate(server);
}

//server.use("*", (req,res)=>{
//    res.render("./pages/error-page");
//})

server.listen(PORT, () => console.log(`Listening on ${ PORT }`))