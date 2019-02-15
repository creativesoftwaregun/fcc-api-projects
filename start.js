const app = require('./app');

const server = app.listen(8080, () => {
	console.log(`Express is running on ${server.address().port}`);
});
