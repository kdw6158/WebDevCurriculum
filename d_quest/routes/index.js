const express = require('express');
const notedb = require('../public/database/notedb.js');
const router = express.Router();

// 초기화면
router.get('/', async (req, res, next) => {
  await res.render('index');
});

// JSON파일에서 data 요청
router.get('/note', async (req, res) => {
  const fileList = await notedb.getData();

  res.json(fileList);
});

// JSON파일 list에 새로운 data 저장
router.post('/note/new', async (req, res) => {
  const { body } = await req;

  // JSON파일 불러오기
  const preData = await notedb.getData();

  // 배열의 마지막에 추가할 값 추가
  preData.list.push({ body }.body);

  notedb.setData(preData);

  res.sendStatus(201);
});

// tab 불러오기
router.get('/tab', async (req, res) => {
  const tabList = await notedb.getData().then((res) => res.tab);
  res.json(tabList);
});

router.post('/tab/add', async (req, res) => {
  const fileList = await notedb.getData();

  const { body } = await req;

  const clkFile = { body }.body.clkFile;

  const result = fileList.tab.find((tab) => tab.fileName == clkFile);

  const fileContent = fileList.list.filter((file) => file.fileName == clkFile);

  if (result == undefined) {
    fileList.tab.push({
      fileName: clkFile,
      fileContent: fileContent[0].fileContent,
      saveState: 'save',
      openState: 'current',
    });
  }

  fileList.tab.map((file) => {
    if (file.fileName == clkFile) {
      file.openState = 'current';
    } else {
      file.openState = 'open';
    }
  });

  notedb.setData(fileList);
  res.status(1);
});

router.post('/tab/current', async (req, res) => {
  const fileList = await notedb.getData();

  const { body } = await req;
  const updateTabs = { body }.body.currentTab;

  fileList.tab.map((file) => {
    file.openState = 'open';

    if (file.fileName == updateTabs) {
      file.openState = 'current';
    }
  });

  notedb.setData(fileList);

  res.send(fileList);
});

router.get('/tab/totab', async (req, res) => {
  const fileList = await notedb.getData();

  const result = fileList.tab.find((tab) => tab.fileName == req.query.fileName);

  const fileContent = fileList.list.filter((file) => file.fileName == req.query.fileName);

  if (result == undefined) {
    fileList.tab.push({
      fileName: req.query.fileName,
      fileContent: fileContent[0].fileContent,
      saveState: 'save',
      openState: 'current',
    });
    notedb.setData(fileList);
  }

  res.send(fileList.tab);
});

router.post('/tab/unsave', async (req, res) => {
  const fileList = await notedb.getData();
  const { body } = await req;
  console.log({ body }.body.fileName);

  fileList.tab.map((tab) => {
    if (tab.fileName == { body }.body.fileName) {
      tab.saveState = 'unsave';
    }
  });

  notedb.setData(fileList);

  res.send('성공');
});

module.exports = router;
