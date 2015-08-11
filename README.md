#Shout Box Node Js App

### Aim

1. User Authentication Using Bcrypt
2. Learn to use Redis

###Changes

1. Used express-session since session is not bundled with express anymore

**sudo npm install express-session --save **

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