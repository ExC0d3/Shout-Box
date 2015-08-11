var User = require('../lib/user');
var Busboy = require('connect-busboy');
exports.form = function(req, res){
	res.render('register', {title: 'Register'});
}

exports.submit = function(req,res,next){
	
	var username;
	var pass;
	req.pipe(req.busboy);
	req.busboy.on('field', function(key,value){
		if(key=='user[name]')
		{
			username=value
		}
		else if(key=='user[pass]')
		{
			pass=value
		}
	});

	req.busboy.on('finish',function(){
		console.log("Parsed Form");
		console.log("UserName:"+username);
		console.log("Password:"+pass);
		User.getByName(username, function(err,user){
		if(err) return next(err);

		if(user.id){
			res.error("Username already takes");
			res.redirect('back');
		} else {

			user  = new User({
				name: username,
				pass: pass
			});

			user.save(function(err){
				if(err) return next(err);
				req.session.uid = user.id;
				res.redirect('/');
			});
		}
	});
	});
}