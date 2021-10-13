class Notepad {
  /* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
  constructor(title, msg) {
    this.title = title;
    this.msg = msg;
  }

  getTitle() {
    return this.title;
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }

  getMsg() {
    return this.msg;
  }

  setMsg(newMsg) {
    this.msg = newMsg;
  }
}

// localStorage에서 key값 가져오기
function getStorageKeys() {
  let storageKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    storageKeys.push(localStorage.key(i));
  }
  return storageKeys;
}

// localStorage에 key가 있는지 확인
function isKeyInArr(arr, key) {
  return arr.includes(key);
}

//  * 열려있는 tab 가져오기
function getTabs() {
  let tabList = [];
  document.querySelectorAll('.tab_list>li').forEach((element) => {
    tabList.push(element.innerText.substring(0, element.innerText.length - 1));
  });
  return tabList;
}

// //  * 열려있는 tab인지 확인
// function isTab(title) {
//   return getTabs().filter((tab) => tab == title).length;
// }

//  * localStorage에 저장된 데이터 목록
function fileListUp() {
  document.querySelectorAll('#title_list>li').forEach((element) => {
    element.remove();
  });

  for (const key of getStorageKeys()) {
    let line = document.createElement('li');
    let list = line.appendChild(document.createElement('Button'));
    list.appendChild(document.createTextNode(key));
    document.querySelector('#title_list').appendChild(line);
  }

  document.querySelectorAll('#title_list button').forEach((element) => {
    element.addEventListener('click', fileToTab);
  });
}

// localStorage에 새로운 데이터 만들기
function createFile() {
  let title = prompt();

  while (title == null && isKeyInArr(getStorageKeys(), title)) {
    let title = prompt();
    this.title = title;
  }

  if (title == null) {
    alert('중복된 이름입니다');
    return;
  }

  localStorage.setItem(title, '');

  fileListUp();
}

//  * file목록에서 클릭하면 tab에 열리기
function fileToTab() {
  let title = this.innerText;
  if (!isKeyInArr(getTabs(), this.innerText)) {
    title = new Notepad(this.innerText, localStorage.getItem(title));

    let tab = document.createElement('li');
    tab.setAttribute('name', this.innerText);
    document.querySelectorAll('.currentTab').forEach((element) => {
      element.setAttribute('class', 'preTab');
    });
    tab.appendChild(document.createTextNode(this.innerText));
    tab.setAttribute('class', 'currentTab');
    tab.addEventListener('click', changeTab);

    let close = document.createElement('button');
    close.appendChild(document.createTextNode('X'));
    close.addEventListener('click', tabClose);
    tab.appendChild(close);

    document.querySelector('.tab_list').appendChild(tab);

    let editBox = document.createElement('textarea');
    editBox.setAttribute('id', this.innerText);
    editBox.appendChild(document.createTextNode(title.getMsg()));
    document.querySelectorAll('textarea').forEach((element) => {
      element.setAttribute('class', 'unsel_editBox');
    });
    editBox.setAttribute('class', 'selected_editBox');
    editBox.addEventListener('keyup', isMsgChanged);
    document.querySelector('.contents').appendChild(editBox);
  }
}

//  * textarea에서 내용이 수정됬는지 확인
function isMsgChanged() {
  let unsavedTab = document.getElementsByName(`${this.getAttribute('id')}`);
  unsavedTab.forEach((element) => {
    element.classList.add('unsaved');
    this.removeEventListener('keyup', isMsgChanged);
  });
}

//  * 수정된 내용 localStorage에 저장하기
function saveFile() {
  let currentFile = document.querySelector('.selected_editBox');

  let savedFileTab = document.getElementsByName(`${currentFile.getAttribute('id')}`);
  savedFileTab.forEach((element) => {
    console.log(element);
    element.classList.remove('unsaved');
  });
  currentFile.addEventListener('keyup', isMsgChanged);

  localStorage.setItem(currentFile.getAttribute('id'), currentFile.value);
}

//  * 다른 key값으로 localStorage에 저장하기
function saveAs() {
  let newTitle = prompt();
  if (isKeyInArr(getStorageKeys(), newTitle)) {
    let currentTitle = document.querySelector('.selected_editBox');
    let currentMsg = currentTitle.value;
    localStorage.setItem(newTitle, currentMsg);
    localStorage.removeItem(currentTitle.getAttribute('id'));

    let currentTab = document.querySelector('.currentTab');
    currentTab.setAttribute('name', newTitle);
    let temp = currentTab.innerHTML.replace(
      currentTab.innerText.substring(0, currentTab.innerText.length - 1),
      newTitle
    );
    currentTab.innerHTML = temp;

    fileListUp();

    document.querySelector('.selected_editBox').setAttribute('id', newTitle);

    saveFile();
  } else {
    alert('중복된 이름입니다');
  }
}

//  * 클릭하면 열려있는 파일 변경하기
function changeTab() {
  document.querySelectorAll('.tab_list li').forEach((element) => {
    element.setAttribute('class', 'preTab');
  });
  this.classList.toggle('currentTab');
  this.classList.toggle('preTab');

  document.querySelectorAll('textarea').forEach((element) => {
    element.setAttribute('class', 'unsel_editBox');
  });

  document
    .getElementById(this.getAttribute('name'))
    .setAttribute('class', 'selected_editBox');
}

//  * 버튼 누르면 탭 닫기
function tabClose() {
  //  * let reShowTab;
  //  * setTimeout(() => {
  let clk_tab = document.querySelector('.selected_editBox').getAttribute('id');
  getTabs().filter((tab) => tab == clk_tab);
  let reShowTab = getTabs().indexOf(clk_tab);
  document.querySelectorAll('.tab_list li').forEach((element) => {
    if (element.getAttribute('name') == clk_tab) {
      element.remove();
    }
  });

  document.querySelectorAll('textarea').forEach((element) => {
    if (element.getAttribute('id') == clk_tab) {
      element.remove();
    }
  });

  if (getTabs().length > 0) {
    if (reShowTab != 0) {
      document
        .querySelector(`.tab_list :nth-child(${reShowTab})`)
        .setAttribute('class', 'currentTab');
      document
        .querySelector(`.contents :nth-child(${reShowTab})`)
        .setAttribute('class', 'selected_editBox');
    } else {
      if (reShowTab == 0) {
        document
          .querySelector(`.tab_list :nth-child(1)`)
          .setAttribute('class', 'currentTab');
        document
          .querySelector(`.contents :nth-child(1)`)
          .setAttribute('class', 'selected_editBox');
      }
    }
  } else {
    document.querySelectorAll('.tab_list li').forEach((element) => {
      if (element.getAttribute('name') == clk_tab) {
        element.remove();
      }
    });

    document.querySelectorAll('textarea').forEach((element) => {
      if (element.getAttribute('id') == clk_tab) {
        element.remove();
      }
    });
  }
  //  * }, 50);
}

window.onload = async () => {
  const btn_new = document.querySelector('#new');
  btn_new.addEventListener('click', createFile);

  const btn_save = document.querySelector('#save');
  btn_save.addEventListener('click', saveFile);

  const btn_save_as = document.querySelector('#save_as');
  btn_save_as.addEventListener('click', saveAs);

  fileListUp();
};
