window.onload = function () {
  const btn = document.querySelectorAll('#title>button');
  btn.forEach((element) => element.addEventListener('click', btn_click));

  async function btn_click(e) {
    switch (e.target.innerText) {
      case 'NEW':
        const id = sessionStorage.getItem('id');
        await console.log(`new, ${id}`);
        // await fetch('http://localhost:3000/new').then((res) => console.log(res));
        break;
      case 'SAVE':
        await console.log('save');
        break;
      case 'SAVE AS':
        await console.log('save as');
        break;
    }
  }
};
