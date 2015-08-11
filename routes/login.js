var User = require('../lib/user');


exports.form = function(req,res){
	res.render('login', {title:'Login'});
}

exports.submit = function(req,res,next){
	
}