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
       Gender: String,
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

module.exports.addCompany = addCompany;
module.exports.viewCompany = viewCompany;
module.exports.findCompany = findCompany;
module.exports.deleteCompany = deleteCompany;
