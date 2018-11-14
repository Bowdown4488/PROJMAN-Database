const mongoose = require('./connectionModel').connection;

const masterListSchema = mongoose.Schema({
    lastName: String,
    firstName: String,
    middleInitial: String,
    position: String,
    gender: String,
    company: String,
    profession: String,
    department: String,
    assignment: String,
    top: String,
    topColor: String,
    bottom: String,
    bottomColor: String,
    setNumber: Number
});

const masterListModel = mongoose.model('masterList', masterListSchema);

function addMasterlist(lastName, firstName, position, gender, company, callback){
    const instance = masterListModel({ lastName: lastName, firstName: firstName, position: position, gender: gender, company: company});
    console.log("Adding masterList to company: " + company);
    instance.save(function (err, inv) {
        if(err) return console.error(err);
        callback();
    });
}  

function viewMyMasterlist(company, callback){
    console.log("Company: "+ company);
    masterListModel.find({company: company}).then((list)=>
    {
       console.log("List: " + list);
       callback(list);
    });
}   

function findMasterCompany(companyName){
   return masterListModel.findOne({company: companyName});
}

function deleteCompanyMasterlist(companyName){   
    var saveName = companyName;
    var name = findMasterCompany(companyName);
    masterListModel.deleteMany(name, function (err, obj){   
      if (err) throw err;
        console.log("Company Masterlist" + saveName + " deleted");   
    });
}

function editMasterlistCompany (oldCompany, company){
    console.log("Old master: " + oldCompany + "+ " + "New master: " + company);
    masterListModel.findOneAndUpdate({company: oldCompany},{
                    company: company
                  }).then();
}

module.exports.addMasterlist = addMasterlist;
module.exports.viewMyMasterlist = viewMyMasterlist;
module.exports.deleteCompanyMasterlist = deleteCompanyMasterlist;
module.exports.editMasterlistCompany = editMasterlistCompany;

