<script lang="ts">
import { onMount } from 'svelte';
import type { Playlist } from './types';

onMount(async () => {
  console.log('%cTypescriptApp.onMount', 'background-color:lime');
})
</script>

<h1>\src\TypescriptApp.svelte</h1>

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
