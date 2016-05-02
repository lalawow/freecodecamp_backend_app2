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

	app.route('/').get(function (req, res) {

			console.log("hello there!")
		});

		app.route('/:_id').get(function (req, res) {
            var id = req.params._id
            var timeIndex
            var answer = {}
			console.log(id+"ok then!")
			if (filterInt(id)>0) {
				timeIndex = filterInt(id)*1000

			} else {
				timeIndex = Date.parse(id)                       
			}
   
			if (timeIndex==NaN) {
				answer = {"unix":null,"natural":null}
				} else {
					var options = { year: 'numeric', month: 'long', day: 'numeric' };
					var time = new Date()
					time.setTime(timeIndex)
					answer = {"unix":time.getTime()/1000,"natural":time.toLocaleDateString('en-US', options)}
				}
			
            console.log(answer.unix+"  "+answer.natural)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(answer))

		});


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

var filterInt = function (value) {
  if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return NaN;
}
