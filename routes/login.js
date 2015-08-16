var User = require('../lib/user');


exports.form = function(req,res){
	res.render('login', {title:'Login'});
}

exports.submit = function(req,res,next){
	var name,pass;
	req.pipe(req.busboy);
	req.busboy.on('field',function(key,value){
		if(key=='user[name]')
		{
			name = value;
		}
		else if(key=='user[pass]')
		{
			pass = value;
		}
	});

	req.busboy.on('finish',function(){
		console.log("User name: "+name);
		console.log("Password: "+pass);
		User.authenticate(name,pass,function(err,user){
			if(err) return next(err);
			if(user) {
				req.session.uid = user.id;
				console.log("Login successful for user:" + user.id);
				res.redirect('/');
			} else {
				res.error("Sorry! invalid credentials.");
				res.redirect('back');
			}
		});
	});
}

exports.logout = function(req,res){
	req.session.destroy(function(err){
		if(err) throw err;
		res.redirect('/');
	});
}