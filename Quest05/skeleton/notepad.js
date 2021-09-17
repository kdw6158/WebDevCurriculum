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

  newMsg(msg) {
    localStorage.setItem(this.title, JSON.stringify(msg));
  }
}
