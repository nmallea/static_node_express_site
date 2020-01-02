// require express
const express = require('express');

// require data from data.json
const data = require('./data.json');
const projects = data.projects;

// use express
const app = express();

// set view engine to pug
app.set('view engine', 'pug');
// app.use('/static', express.static('public'));
// app.use('/public', express.static('public'));
app.use('/public', express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public'));

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

// An dynamic project route to render routes based on project id and renders a customized version of the pug project template.
app.get('/project/:id', (req, res, next) => {
	const { id } = req.params;

	const project = projects[id];
	res.render('project', { project });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
