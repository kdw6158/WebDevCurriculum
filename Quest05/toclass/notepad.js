class Notepad {
  /* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
  constructor() {}

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

let tabs = [];

function localKeys(keys) {
  for (let i = 0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i));
  }
}

function btn_new() {
  let li_button = document.createElement('Button');
  let ul_li = document.createElement('li');
  ul_li.appendChild(li_button);
  let title = prompt('title 입력');
  li_button.append(document.createTextNode(title));

  if (keys.filter((key) => key == title) == false) {
    localStorage.setItem(title, '');
    document.querySelector('#title_list').appendChild(ul_li);
    document.querySelectorAll('#title_list li').forEach((element) => {
      element.remove();
    });
    listup();
  }
}

function btn_save() {
  let currentArea = document.querySelector('.tab_selected');

  localStorage.setItem(currentArea.getAttribute('id'), currentArea.value);
}

function btn_save_to() {
  let currentArea = document.querySelector('.tab_selected');
  btn_new();
  localStorage.setItem(localStorage.key(localStorage.length), currentArea.value);
  localStorage.removeItem(currentArea.getAttribute('id'));
}

function listup() {
  for (let i = 0; i < localStorage.length; i++) {
    // console.log(`key ${i}: ${localStorage.key(i)}`);
    let li = document.createElement('li');
    let list = li.appendChild(document.createElement('Button'));
    list.appendChild(document.createTextNode(localStorage.key(i)));
    document.querySelector('ul').appendChild(li);
  }
}

// for (let list of document.querySelectorAll('#title_list Button')) {
//   list.addEventListener('click', function () {
//     alert('!!');
//     if (tabs.filter((tab) => tab == this.innerHTML)) {
//       tabs.push(list.innerHTML);
//       console.log(tabs);
//       for (let child of document.querySelectorAll('.tab_list li')) {
//         child.remove();
//       }
//       for (let child of document.querySelectorAll('.contents textarea')) {
//         child.remove();
//       }
//       tab_up(tabs);
//     }
//   });
// }

function tab_up(tabs) {
  for (let tab of tabs) {
    let title = document.createElement('li');
    title.append(document.createTextNode(tab));
    title.setAttribute('onclick', 'clk_tab(this)');

    let close = document.createElement('Button');
    close.setAttribute('onclick', 'closed(name, event)');
    close.setAttribute('name', tab);
    close.setAttribute('value', 'x');

    title.append(close);

    document.querySelector('.tab_list').appendChild(title);

    let container = document.createElement('textarea');

    container.setAttribute('id', tab);
    container.appendChild(document.createTextNode(localStorage.getItem(tab)));

    document.querySelectorAll('textarea').forEach((element) => {
      element.setAttribute('class', 'tab_unsel');
    });

    container.setAttribute('class', 'tab_selected');

    document.querySelector('.contents').appendChild(container);
  }
}

function closed(text, event) {
  // 버블링 제거
  event.stopPropagation();

  if (tabs.filter((tab) => tab == text)) {
    let current_tab_index = tabs.indexOf(text);
    console.log(current_tab_index);
    tabs.splice(current_tab_index, 1);
    console.log(tabs);

    document.querySelectorAll('.tab_list li').forEach((element) => {
      element.remove();
    });
    tab_up(tabs);
  }
}

function clk_tab(name) {
  let this_tab = document.getElementById(name.innerText);
  console.log(this_tab);

  document.querySelectorAll('textarea').forEach((element) => {
    element.setAttribute('class', 'tab_unsel');
  });

  this_tab.setAttribute('class', 'tab_selected');
}
