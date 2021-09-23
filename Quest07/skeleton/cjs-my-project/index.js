// TODO: cjs-package와 esm-package의 함수와 클래스들을 가져다 쓰고 활용하려면 어떻게 해야 할까요?
const cjs = require('../cjs-package/index');

let pcjstocjs = new cjs.CjsUtilClass(77);

console.log(pcjstocjs);
console.log(pcjstocjs.foo);
console.log(pcjstocjs.double());

const cjsfunc = cjs.cjsUtilFunction('abcde');
console.log(cjsfunc);
