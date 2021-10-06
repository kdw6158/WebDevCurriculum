class Notepad {
  constructor(notepad, fileName, fileContent) {
    this.notepad = notepad;
    this.id = sessionStorage.getItem('id');
    this.fileName = fileName;
    this.fileContent = fileContent;
    this.openState = '';
    this.saveState = 'saved';
  }

  getNotepad() {
    return this.notepad;
  }

  setNotepad(note) {
    this.notepad.push(note);
  }

  getId() {
    return this.id;
  }

  getFileName() {
    return this.fileName;
  }

  setFileName() {
    const newTitle = prompt();
    this.fileName = newTitle;
  }

  getFileContent() {
    return this.fileContent;
  }

  setFileContent() {
    let newContent = 'unsaved msg';
    this.fileContent = newContent;
  }

  getOpenState() {
    return this.openState;
  }

  setOpenState(state) {
    this.openState = state;
  }

  getSaveState() {
    return this.saveState;
  }

  setSaveState(state) {
    this.saveState = state;
  }
}
