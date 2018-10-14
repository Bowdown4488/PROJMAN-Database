const mongoose = require('./connectionModel').connection;

const companySchema = mongoose.Schema({
	companyName: String,
    personDetails:[{
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

//function viewCompany(callback){
//  companyModel.find({}, function (err, list) {
//    if(err) return console.error(err);
//    callback(list);
//  });
//}

function addCompany(company, callback){
   const instance = companyModel({ companyName: company});
   console.log("Adding company: " + company);
   instance.save(function (err, inv) {
        if(err) return console.error(err);
        callback();
  });
}

module.exports.addCompany = addCompany;
