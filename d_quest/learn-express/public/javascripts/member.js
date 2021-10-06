class Member {
  constructor(id, pw, nickname) {
    this.id = id;
    this.pw = pw;
    this.nickname = nickname;
  }

  getId() {
    return this.id;
  }

  getPw() {
    return this.pw;
  }

  getNickname() {
    return this.nickname;
  }
}
