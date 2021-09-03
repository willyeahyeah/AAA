import Typescript from './TypescriptApp.svelte';

let ele = document.querySelector('typescript');

if (ele) {
  console.log('Initializing Typescript...', ele);
  new Typescript({
    target: ele,
  });
}
