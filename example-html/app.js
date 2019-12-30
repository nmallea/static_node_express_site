// require express & middleware
const express = require('express');
const path = require('path');
const exphbs = require('express-pug');

// require data from data.json
const data = require('./data.json');
const projects = data.projects;

// use express in app
const app = express();

// set 'view engine' and pug middleware
app.engine('pug', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'pug');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// homepage route
app.get('/', (req, res) => {
	res.render('index', { projects });
});

// local variable equal to json projects
app.locals = data.projects;

// about route
app.get('/about', (req, res) => {
  res.render('about');

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));