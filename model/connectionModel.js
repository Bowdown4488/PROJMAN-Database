const mongoose = require('mongoose');
 mongoose.connect('mongodb://webapde-meme:memefactory1@ds115762.mlab.com:15762/heroku_fqhtqr64',
{
    useNewUrlParser: true
});
 module.exports.connection = mongoose