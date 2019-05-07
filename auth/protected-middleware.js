// const bcrypt = require('bcryptjs');
// const Users = require('../data/users-model');

function protected(req, res, next) {
	if (req.session && req.session.username) {
		next();
	} else {
		res.status(401).json({ message: 'You Shall Not Pass!' });
	}

	// const { username, password } = req.headers;

	// if (username && password) {
	// 	Users.findBy({ username })
	// 		.first()
	// 		.then((user) => {
	// 			if (user && bcrypt.compareSync(password, user.password)) {
	// 				next();
	// 			} else {
	// 				res.status(401).json({ message: 'You shall not pass!' });
	// 			}
	// 		})
	// 		.catch((err) => res.status(500).json(err));
	// } else {
	// 	res.status(400).json({ message: 'Please provide a valid Username and Password.' });
	// }
}

module.exports = protected;
