const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const Users = require('../data/users-model');
const protected = require('../auth/protected-middleware');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/api', (req, res) => {
	res.send(`Please Login`);
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

module.exports = server;
