const express = require('express');
const router = express.Router();
const db = require('../datas/datas.js');

router.use(express.json());

/* GET home page. */
router.get('/', async function (req, res, next) {
  // let id = sessionStorage.getItem('id');
  // console.log(id);
  // let dataList = await db.getData().then((res) => res.test2);
  // .then((data) => JSON.stringify(data));

  res.render('index', { title: 'Notepad', data: [{ k: 'v' }] });
  // res.send(dataList);
});

router.get('/hi', function (req, res) {
  res.send('successed');
});

module.exports = router;
