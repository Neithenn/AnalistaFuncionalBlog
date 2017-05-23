var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://adminAnalista:amelie91@ds149221.mlab.com:49221/analistafuncionalblog');


var user_schema = new Schema({
	username: String,
	password: String,
	role: String
});


module.exports = mongoose.model("User", user_schema);