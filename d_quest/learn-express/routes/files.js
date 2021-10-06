const express = require('express');
const router = express.Router();
const db = require('../datas/datas.js');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  // res.render('files', { datas: getDatas });

  // console.log(req.params.id);

  let dataList = await db.getData();

  await res.send(JSON.stringify(dataList));
  // await res.send('test');
});

module.exports = router;
