const express = require('express');
const router = express.Router();
const db = require('../datas/datas.js');

router.use(express.json());

/* GET home page. */
router
  .get('/', async (req, res, next) => {
    res.render('login');
  })
  .post('/', async (req, res, next) => {
    const members = await db.getData().then((res) => res.member);

    const userId = req.body.id;
    const userPw = req.body.pw;

    let isLogin = false;

    members.map((member) => {
      console.log(member.id, member.pw, member.nickname);
      if (member.id == userId && member.pw == userPw) {
        console.log('true');
        isLogin = true;
      }
    });

    isLogin ? res.render('index') : res.render('login');
  });

module.exports = router;
