// @ts-nocheck
// element select
const one = (ele) => document.querySelector(ele);
// elements select all
const all = (ele) => document.querySelectorAll(ele);

// name, attr 갖는 element 생성
const create = (name, attr) => {
  const ele = document.createElement(name);
  for (const key in attr) {
    const attrValue = attr[key];
    switch (key) {
      case 'html':
        ele.innerHTML = attrValue;
        break;
      case 'event':
        for (const event in attrValue) ele.addEventListener(event, attrValue[event]);
        break;
      default:
        ele.setAttribute(key, attrValue);
        break;
    }
  }
  return ele;
};

class Ajax {
  // 비동기 통신 get json
  static async get(url) {
    const json = await fetch(url).then((res) => res.json());
    if (!json.success) throw json.err;
    return json.data;
  }

  // 비동기 통신 set json
  static async set(url, data, method = 'post') {
    const headers = { 'Content-Type': 'application/json' };
    const params = { method, headers, body: JSON.stringify(data) };
    const json = await fetch(url, params).then((res) => res.json());
    if (!json.success) throw json.err;
    return json.data;
  }
}

// DB(json파일) 접근
class Note {
  async getFile() {
    return await Ajax.get('/file');
  }
  async setFile(file) {
    await Ajax.set('/file', { file });
  }
  async getTab(parent) {
    return (await Ajax.get('/tab/' + parent)) || [];
  }
  async addTab(tab, parent) {
    await Ajax.set('/tab/' + parent, { tab });
  }
}

// Notepad 구현 class
class Notepad {
  /* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
  constructor(note) {
    this.note = note;
    this.fileInput = one('#new');
    this.fileList = one('#title_list');
    // this.fileUpdate = ;
    this.tabList = one('.tab_list');
    // this.tabClose =
    this.fileInput.onclick = this.addFile();
  }

  // new 버튼 누르면 prompt 통해 새 파일 만들기
  addFile() {
    const $this = this;
    return async (e) => {
      const file = await $this.note.getFile();
      let fileName = prompt();
      file.push({ name: fileName });
      await $this.note.setFile(file);
      $this.fileListup(file);
    };
  }

  // json에 각 file에 대한 element 생성 => fileList
  fileListup(file) {
    const ul = create('ul');
    file.forEach((v, k) => {
      ul.appendChild(
        create('li', {
          html: v.name,
          event: { click: this.tabListup(v.name, k) },
          // click: this.tabRender(v.name, k)
        })
      );
    });
    this.fileList.innerHTML = '';
    this.fileList.appendChild(ul);
  }

  addTab(fileEvent, parent) {
    const $this = this;
    return async (clickEvent) => {
      await $this.note.addTab(
        { name: clickEvent.target.value, state: false },
        index,
        parent
      );
      fileEvent.target.click();
    };
  }

  // setTab(v) {
  //   const $this = this;
  //   return async (e) => {
  //     v.state = !v.state;
  //     await $this.model.setTab(v, v.idx);
  //     e.target.style.color = v.state ? '#09F' : '';
  //   };
  // }

  // tab 보여줄 element Listup
  tabListup(fileName, parent) {
    const $this = this;
    return async (e) => {
      const title = create('h3', { html: fileName });
      // const ul = create('ul');
      const ul = one('.tab_list');
      const tab = await $this.note.getTab(parent);
      const input = create('input', {
        class: 'tab-input',
        size: 20,
        placeholder: 'tab 입력',
        event: { keyup: $this.addTab(e, parent) },
      });

      const close = create('button', {
        type: 'button',
        html: 'X',
        event: { click: (e) => ($this.tabList.innerHTML = '') },
      });

      tab.forEach((v) => ul.appendChild(create('li', { html: v.name })));
      $this.tabList.innerHTML = '';

      for (const ele of [title, close]) $this.tabList.appendChild(ele);
    };
  }
}

window.onload = async () => {
  const note = new Note();
  const notepad = new Notepad(note);
  const file = await note.getFile();
  notepad.fileListup(file);
};
