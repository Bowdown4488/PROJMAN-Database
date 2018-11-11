const companyModel = require('../model/companyModel');
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
       if(req.session.type !== undefined){
            console.log("Session is up:" + req.session.type);
            var user = {type: req.body.type};
            console.log(req.body.type);
            if(user === "ADMIN" || user === "admin"){
                    resp.render('./pages/home-page',{type: req.body.type});
            }
            else{
                var user = "edit"
                resp.render('./pages/home-page',{type: user});
            }
       }
        else{
               resp.render('./pages/index');
        }

});
    
server.get('/logout', function(req, resp){
    console.log("Destroying Session:" + req.session.type);
    req.session.destroy();
    resp.redirect('/');
    });

server.post('/home-page', urlencoder,function(req, resp){
    if(req.session.type !== undefined){
        console.log("Session is up:" + req.session.type);
        var user = req.body.type;
        console.log(user);
        if(user === "ADMIN" || user === "admin"){
                var admin = "Admin"
                companyModel.viewCompany(function(list){
                    const data = { list:list };
                    resp.render('./pages/home-page',{type: admin, data:data}); 
                });
        }
        else{
            var user = "edit"
                companyModel.viewCompany(function(list){
                    const data = { list:list };
                    resp.render('./pages/home-page',{type: user, data:data}); 
                });
        }
    }
    else{
        req.session.type = req.body.type
        console.log("Making new Session:" + req.session.type);
        var user = req.body.type;
        console.log(user);
        if(user === "ADMIN" || user === "admin"){
                var admin = "Admin"
                companyModel.viewCompany(function(list){
                    const data = { list:list };
                    resp.render('./pages/home-page',{type: admin, data:data}); 
                });
        }
        else{
                var user = "Edit"
                companyModel.viewCompany(function(list){
                    const data = { list:list };
                    resp.render('./pages/home-page',{type: user, data:data}); 
                });
        }
    }
});

server.post('/companyView', urlencoder,function(req, resp){
//    var form = new formidable.IncomingForm();
//    form.parse(req, function (err, fields, files) {
        var company = req.body.company; 
        var address = req.body.address;
        var person = req.body.person;
        var position = req.body.position;
        var details = req.body.details;
        var taxNumber = req.body.taxNumber;
        console.log("Company: " + company)
        companyModel.addCompany(company, address, person, position, details, taxNumber, function(){ 
            console.log("Rendering")
            resp.render('./pages/companyView',{company: company});   
        });
//    });
});

server.post('/edit-Company', function(req,resp){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        console.log("Starting update with old company name:" + fields.oldCompany);
        companyModel.editCompany(fields.oldCompany, fields.company, fields.address, fields.person, fields.position, fields.details, fields.taxNumber);
        console.log("finish update with new company name:" + fields.company);
        
        if(user === "ADMIN" || user === "admin"){
            var admin = "Admin"
            companyModel.viewCompany(function(list){
                const data = { list:list };
                    resp.render('./pages/home-page',{type: admin, data:data}); 
                });
        }
        else{
            var user = "Edit"
            companyModel.viewCompany(function(list){
                const data = { list:list };
                    resp.render('./pages/home-page',{type: user, data:data}); 
                });
        }  
    });
}); 
    
server.get('/companyView/:company', function(req, resp){
    console.log("Title passed: " + req.params.company);
    var findCompany = companyModel.findCompany(req.params.company);
    findCompany.then((foundCompany)=>
    {
        console.log("Company Found: " + foundCompany.companyName);
        var company = foundCompany.companyName;
        resp.render('./pages/companyView',{company: company});  
    })
});
    
server.get('/deleteCompany/:company', function(req, resp){
    console.log("company passed: " + req.params.company);
    var deleteCompany = companyModel.deleteCompany(req.params.company);
    console.log("Company To be Deleted: " + req.params.company);
    console.log(deleteCompany);
    console.log("test");
    if(user === "ADMIN" || user === "admin"){
        var admin = "Admin"
        companyModel.viewCompany(function(list){
            const data = { list:list };
            resp.render('./pages/home-page',{type: admin, data:data}); 
            });
        }
        else{
        var user = "Edit"
        companyModel.viewCompany(function(list){
            const data = { list:list };
            resp.render('./pages/home-page',{type: user, data:data}); 
            });
        }  
});
    
server.get('/editCompany/:company', function(req,resp){
    var oldCompany = req.params.company;
    console.log("company passed: " + oldCompany);
    var findCompany = companyModel.findCompany(oldCompany);
    findCompany.then((foundCompany)=>
    {
        console.log(foundCompany);
        var company = foundCompany.companyName; 
        var address = foundCompany.companyAddress;
        var person = foundCompany.contactPerson;
        var position = foundCompany.contactPosition;
        var details = foundCompany.contactDetails;
        var taxNumber = foundCompany.taxNumber;
        
        resp.render('./pages/editCompany',{ companyID: foundCompany._id, companyName: company, companyAddress: address, contactPerson: person, contactPosition: position, contactDetails: details, taxNumber: taxNumber});
        
    })
}); 
     
}

module.exports.Activate = userModule;