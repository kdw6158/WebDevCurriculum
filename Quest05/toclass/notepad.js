const one = (ele) => document.querySelector(ele);
const all = (ele) => document.querySelectorAll(ele);
const create = (name, attr) => {
  const ele = document.createElement(name);
  for (const key in attr) {
    const attrValue = attr[key];
    switch (key) {
      case 'html': ele.innerHTML = attrValue;
        break;
      case 'event': for (const event in attrValue) ele.addEventListener(event, attrValue[event]);
        break;
      default: ele.setAttribute(key, attrValue);
        break;
    }
  }
  return ele
}

class Ajax{
  static async get(url) {
    const json = await fetch(url).then(res => res.json())
    if (!json.success) throw json.err;
    return json.data;
  }
  static async set(url, data, method = "post") {
    const headers = { 'Content-Type': 'application/json' };
    const params = { method, headers, body: JSON.stringify(data) };
    const json = await fetch(url, params).then(res => res.json());
    if (!json.success) throw json.err;
    return json.data;
  }
}

class Note{
  async getFile() {
    return await Ajax.get('/file');
  }
  async setFile(file) {
    await Ajax.set('/file', { file });
  }
  async getTab(parent) {
    return await Ajax.get('/tab' + parent) || [];
  }
  async addTab(tab, parent) {
    await Ajax.set('/tab' + parent, { tab });
  }
}

class Notepad {
  /* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
  constructor(note) {
    this.note = note;
    this.fileInput = one('.file-input');
    this.fileList = one('.file-list');
    this.fileUpdate = ;
    this.tabList = one('.tab-list');
    this.tabClose = 
    this.fileInput.onkeyup = this.addFile();
  }

  addFile() {
    const $this = this;
    return async (e) => {
      if (e.keyCode === 13) {
        const file = await $this.note.getFile();
        file.push({ name: e.target.value });
        await $this.note.setFile(file);
        $this.fileListup(file);
        e.target.value=''
      }
    }
  }

  fileListup(file) {
    const ul = create('ul');
    file.forEach((v, k) => {
      ul.appendChild(create('li', {html: v.name, event: {click: this.tabRender(v.name, k)}}))
    })
    this.fileList.innerHTML = ''
    this.fileList.appendChild(ul);
  }

}