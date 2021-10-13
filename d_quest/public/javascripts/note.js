class FileElement {
  clickedfile = [];

  //  filelist
  #fileElement = document.querySelector('#title_list');

  getFileElement() {
    return this.#fileElement;
  }

  // 파일리스트 렌더링
  fileListRender(noteList) {
    noteList.map((note) => {
      const li = document.createElement('li');
      li.textContent = note.fileName;
      this.#fileElement.append(li);
    });
  }

  async add() {
    const fileName = prompt();

    const req = await fetch('/note/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName,
        fileContent: '',
      }),
    });

    const li = document.createElement('li');
    li.textContent = fileName;
    document.querySelector('#title_list').append(li);
  }

  async save() {
    // const req = await fetch('/note/save', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({}),
    // });
    console.log('save!');
  }

  async saveAs() {}
}

class TabElement {
  #tabElement = document.querySelector('#tab_list');
  #textElement = document.querySelector('#content');

  tabListRender(tabList) {
    this.#tabElement.innerHTML = '';
    tabList.map((tab) => {
      const li = document.createElement('li');
      li.textContent = tab.fileName;
      li.setAttribute('class', 'open');

      // 탭 클릭시 DB 변경
      li.addEventListener('click', async (e) => {
        const currentTab = e.target.textContent;

        // 추가한 li에 클래스 지정, 선택한 요소 클래스는 current
        for (let item of this.#tabElement.children) {
          item.setAttribute('class', 'open');
        }
        e.target.setAttribute('class', 'current');

        // DB와 현재 클릭한 요소 정보 동기화
        const res = await fetch('/tab/current', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentTab,
          }),
        }).then((res) => res.json());

        const currentFile = await res.list.filter((file) => file.fileName == currentTab);
        const currentContent = currentFile[0].fileContent;

        this.textareaRender(currentFile[0].fileName, currentContent);
      });
      this.#tabElement.append(li);
    });
  }

  textareaRender(fileName, fileContent) {
    this.#textElement.setAttribute('name', fileName);
    this.#textElement.value = fileContent;
    this.#textElement.addEventListener('keyup', this.textareaKeyEvent);
  }

  async textareaKeyEvent(e) {
    const fileName = await e.target.name;
    console.log(fileName);
    const res = await fetch('/tab/unsave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName: fileName }),
    });
  }
}

class HeaderElement {
  #element = document.querySelector('header');

  setEventNewButton(event) {
    document.getElementById('new').addEventListener('click', event);
  }

  setEventSaveButton(event) {
    document.getElementById('save').addEventListener('click', event);
  }

  setEventSaveButton(event) {
    document.getElementById('saveAs').addEventListener('click', event);
  }
}

class Notepad {
  #files = [];
  #tabs = [];

  #headerElement = new HeaderElement();

  #fileElement = new FileElement();
  #tabElement = new TabElement();

  setFileList(fileData) {
    this.#files = fileData.list;
    this.#fileElement.fileListRender(this.#files);
    this.#fileElement.getFileElement().addEventListener('click', async (e) => {
      const clkFile = e.target.textContent;
      await fetch('/tab/totab?fileName=' + clkFile);

      const tabData = await fetch('/tab').then((req) => req.json());

      this.#tabElement.tabListRender(tabData);
    });
    this.#headerElement.setEventNewButton(this.#fileElement.add);
  }

  setTabList(tabData) {
    this.#tabs = tabData;
    this.#tabElement.tabListRender(this.#tabs);
    this.#headerElement.setEventSaveButton(this.#tabElement.save);
    // this.#headerElement.setEventSaveButton(this.#fileElement.save);
    // this.#headerElement.setEventSaveAsButton(this.#fileElement.saveAs);
  }
}

window.onload = async () => {
  const notepad = new Notepad();

  const fileData = await fetch('/note').then((req) => req.json());
  notepad.setFileList(fileData);

  const tabData = await fetch('/tab').then((req) => req.json());
  notepad.setTabList(tabData);
};
