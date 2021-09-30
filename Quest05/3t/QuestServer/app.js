'use strict';

const express = require('express');
const db = require('./Data.js');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 8000);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
  db.setData('testData');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

app.use(express.static('public'));

app.get('/Data.json', (req, res, next) => {
  res.json(db.getData);
});
