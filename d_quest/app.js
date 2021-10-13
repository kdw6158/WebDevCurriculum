const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const notepadRouter = require('./routes/index');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', notepadRouter);

app.listen(8000, () => console.log('Server On'));

module.exports = app;
