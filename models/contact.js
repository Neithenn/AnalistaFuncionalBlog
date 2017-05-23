var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://adminAnalista:amelie91@ds149221.mlab.com:49221/analistafuncionalblog');


var contact_schema = new Schema({
	email: String,
	text: String
});


module.exports = mongoose.model("Contact", contact_schema);