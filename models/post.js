var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://adminAnalista:amelie91@ds149221.mlab.com:49221/analistafuncionalblog');


var post_schema = new Schema({
	title: String,
	intro: String,
	text: String,
	author: String,
	date: String
});


module.exports = mongoose.model("Post", post_schema);