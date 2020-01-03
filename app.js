// require express
const express = require('express');
const reload = require('express-reload');

// require data from data.json
const data = require('./data.json');

const projects = data.projects;
const PORT = process.env.PORT || 3000;

// use express
const app = express();
const path = __dirname + '/public';
const server = __dirname + '/app.js'

// set view engine to pug
app.set('view engine', 'pug');

// set static path to serve images, css, etc
app.use('/public', express.static(path));

// index route to render the home page
app.get('/', (req, res) => {
	res.render('index', { projects });
});

// route to render the about page
app.get('/about', (req, res) => {
	res.render('about');
});

// local variable equal to projects in data.json
app.locals = data.projects;

// renders a customized version of the pug project template
app.get('/project/:id', (req, res, next) => {
	const { id } = req.params;
	const project = projects[id];
	res.render('project', { project });
});

// handles a 404 error
app.use((req, res, next) => {
	console.error('Oh darn, this link isn’t working.');
	const err = new Error('Page not Found');
	err.status = 404;
	next(err);
});

//  error information
app.use((err, req, res, next) => {
	res.locals.error = err;
	res.status(500 || err.status);
	res.render('error');

	console.log('Link not working');
});


// hotreload app.js
app.use(reload(server));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
