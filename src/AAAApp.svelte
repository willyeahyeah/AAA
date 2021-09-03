<script lang="ts">
import { onMount } from 'svelte';

onMount(async () => {
  console.log('%cAAAApp.onMount', 'background-color:lime');
})
</script>

<h1>\src\AAAApp.svelte</h1>

<style type="text/scss">
p {
  &.abc {
    background-color: yellow;
  }
  &:hover {
    background-color: pink;
  }
}
</style>
