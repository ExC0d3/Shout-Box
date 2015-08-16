#Shout Box Node Js App

Developing Shout Box App from Node In Action and listing 
personal changes.


### Aim

1. User Authentication Using Bcrypt
2. Learn to use Redis

###Changes

1. Used express-session since session is not bundled with express anymore

**sudo npm install express-session --save**

```javascript
var session = require(express-session);
.
..
...
app.use(session({
	secret: 'shoutBox',
	resave: true,
	saveUninitialized: true
}));

```

2. Used connect-busboy for parsing registration from and added custom methood to submit username
and password to redis


**sudo npm install connect-bustboy --save**

*Inside app.js*

```javascript
var busboy = require('connect-busboy');
.
..
....
app.use(busboy()).

```

*Inside register.js route file*

```javascript
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
```

3. Use busboy-connect to for login logic
	inside login.js add

```javascript
	
	.
	..
	...
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

```