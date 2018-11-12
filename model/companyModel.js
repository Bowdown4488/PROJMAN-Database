const mongoose = require('./connectionModel').connection;

const companySchema = mongoose.Schema({
	companyName: String,
    companyAddress: String,
    contactPerson: String,
    contactPosition: String,
    contactDetails: String,
    taxNumber: String,
    masterList:[{
       lastName: String,
       firstName: String,
       position: String,
       gender: String,
       company: String, 
       fabricKind:String, //if shirt,pants,etc
       color: String,
       isCustom:String, //put the custom size
       isNormal:String //put if small medium large
    }]
});

const companyModel = mongoose.model('company', companySchema);

function viewCompany(callback){
  companyModel.find({}, function (err, list) {
    if(err) return console.error(err);
    callback(list);
  });
}

function addCompany(company, address, person, position, details, taxNumber, callback){
   const instance = companyModel({ companyName: company, companyAddress: address, contactPerson: person, contactPosition: position, contactDetails: details, taxNumber:taxNumber});
   console.log("Adding company: " + company);
   instance.save(function (err, inv) {
        if(err) return console.error(err);
        callback();
  });
}

function editCompany (oldCompany, company, address, person, position, details, taxNumber){
    console.log("Old: " + oldCompany + "+ " + "New: " + company);
    companyModel.findOneAndUpdate({companyName: oldCompany},{
        companyName: company, companyAddress: address, contactPerson: person, contactPosition: position, contactDetails: details, taxNumber: taxNumber
    }).then();
}

function editCompanyArray (oldCompany, company){
    console.log("Old: " + oldCompany + "+ " + "New: " + company);
    companyModel.findOneAndUpdate({companyName: oldCompany},{
        company: company
    }).then();
}

function findCompany(companyName){
   return companyModel.findOne({companyName: companyName});
}

function deleteCompany(companyName){   
    var saveName = companyName;
    var name = findCompany(companyName);
    companyModel.deleteOne(name, function (err, obj){   
      if (err) throw err;
        console.log("Company " + saveName + " deleted");   
    });
}

function addMasterlistCompany(lastName, firstName, position, gender, company, callback){
     var newMasterlist = {
        lastName: lastName,
        firstName: firstName,
        position: position,
        gender: gender,
        company: company
        }
     var find = company;
     console.log("company " + newMasterlist.company);
     companyModel.findOne({companyName: find}).then((companyFound) => {
         companyFound.masterList.push(newMasterlist);
         console.log("Company" + companyFound.companyName);
         console.log("saving masterlist" + newMasterlist);
         companyFound.save().then((companyFound)=>{ 
             console.log("test");
               callback();
         });
     })
}  

module.exports.addMasterlistCompany = addMasterlistCompany;
module.exports.addCompany = addCompany;
module.exports.viewCompany = viewCompany;
module.exports.findCompany = findCompany;
module.exports.deleteCompany = deleteCompany;
module.exports.editCompany = editCompany;
module.exports.editCompanyArray = editCompanyArray;

