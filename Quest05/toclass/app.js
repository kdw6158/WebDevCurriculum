// @ts-nocheck
const express = require('express');
const db = require('./db/db.js');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
  res.render('index');
});

app
  .route('/file')
  .get(async (req, res) => {
    const result = { success: true };
    try {
      const json = await db.getData();
      result.data = json.file;
    } catch (err) {
      result.success = false;
      result.err = err;
    }
    res.json(result);
  })
  .post(async (req, res) => {
    const result = { success: true };
    const file = req.body.file;
    try {
      const json = await db.getData();
      json.file = file;
      await db.setData(json);
    } catch (err) {
      result.success = false;
      result.err = err;
    }
    res.json(result);
  });

app
  .route('/tab/:parent')
  .get(async (req, res) => {
    const result = { success: true };
    const parent = req.params.index;
    try {
      const json = await db.getData();
      list = [];
      json.tab.forEach((v, index) => {
        if (v.parent === parent) {
          v.index = index;
          list.push(v);
        }
      });
      result.data = list;
    } catch (err) {
      result.success = false;
      result.err = err;
    }
    res.json(result);
  })
  .post(async (req, res) => {
    const result = { success: true };
    const tab = req.body.tab;
    const parent = req.params.parent;
    try {
      const json = await db.getData();
      tab.parent = parent;
      json.tab.push(tab);
      await db.setData(json);
    } catch (err) {
      result.success = false;
      result.err = err;
    }
    res.json(result);
  })
  .put(async (req, res) => {
    const result = { success: true };
    const tab = req.body.tab;
    const index = req.params.parent;
    try {
      const json = await db.getData();
      json.tab[index] = tab;
      await db.setData(json);
    } catch (err) {
      result.success = false;
      result.err = err;
    }
    res.json(result);
  });

app.listen(3000, () => console.log('3000 Port On!'));
