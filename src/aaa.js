import AAA from './AAAApp.svelte';

let ele = document.querySelector('aaa');

if (ele) {
  console.log('Initializing AAAA...', ele);
  new AAA({
    target: ele,
  });
}
