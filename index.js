const server = require('./api/server');

server.get('/', (req, res) => {
	res.send('Please Login to Access the API');
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n*** Server Running on port ${port} ****\n`));
