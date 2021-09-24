// TODO: cjs-package와 esm-package의 함수와 클래스들을 가져다 쓰고 활용하려면 어떻게 해야 할까요?
// @ts-ignore
import { EsmUtilClass, esmUtilFunction } from '../esm-package/index.mjs';
// console.log(esmtoesm);

let test2 = new EsmUtilClass(2);
console.log(test2);
console.log(test2.foo);
console.log(test2.double());

console.log(esmUtilFunction('abcde'));
