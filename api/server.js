const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const Users = require('../data/users-model');
const protected = require('../auth/protected-middleware');

const server = express();

const sessionConfig = {
	name              : 'Oralita',
	secret            : 'Pura Vida, mi hijo!',
	cookie            : {
		httpOnly : true,
		maxAge   : 1000 * 60 * 1,
		secure   : false
	},
	resave            : false,
	saveUninitialized : true
};

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/api', (req, res) => {
	const username = req.session.username || 'stranger';
	res.send(`Welcome ${username}!`);
});

server.post('/api/register', (req, res) => {
	let user = req.body;
	// console.log('from server', req);
	const hash = bcrypt.hashSync(user.password, 5);
	user.password = hash;

	Users.add(user)
		.then((saved) => {
			res.status(201).json(saved);
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});

server.post('/api/login', (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				req.session.username = user.username;
				res.status(200).json({ message: `Welcome ${user.username}. You are succesfully Logged in.` });
			} else {
				res.status(401).json({ message: 'You shall not pass!' });
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

server.get('/api/users', protected, (req, res) => {
	Users.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => res.status(500).json(err.message));
});

server.get('/api/logout', (req, res) => {
	if (req.session) {
		req.session.destroy((err) => {
			if (err) {
				res.send('oops! something went wrong.');
			} else {
				res.send('you have successfully logged out.');
			}
		});
	} else {
		res.send('Your session has timed out');
	}
});

module.exports = server;
