'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');


module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();
// For Freecodecamp back end project2: Request Header Parser Microservice
	app.route('/').get(function (req, res) {
//	    answer = {"ipaddress":"58.49.43.197","language":"en-US","software":"Windows NT 6.3; Win64; x64"}
		var answer = {}

		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;            
	    console.log("hello there! "+ip)
	    answer["ipaddress"]=ip

        var language =  req.headers["accept-language"]
        answer["language"] = language.split(",")[0]
        console.log("hello people " + language)

        
        var option = /\(.*?\)/
        var software = option.exec(req.headers['user-agent'])[0]
        answer["software"] = software.substr(1,software.length-2)

	    res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(answer))

		});
/*



/*
	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);

		*/
};


