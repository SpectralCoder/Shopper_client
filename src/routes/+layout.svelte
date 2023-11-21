<script>
   import { goto } from '$app/navigation';
   import { browser } from '$app/environment';
   import {isLoggedIn} from '../lib/store/UserStore';
   import { updateRefreshToken } from '../lib/store/UserStore';
	import { onMount, onDestroy } from 'svelte';
   import "./styles.css";
   import Nav from "./nav.svelte";

   $: if (browser && !$isLoggedIn && $isLoggedIn !== 'loading'){
      goto('/login');
    }

	let intervalId;

	onMount(() => {
		const FOURTYFIVE_MINUTE = 1 * 60 * 1000 * 45;
		console.log('calling once');
		updateRefreshToken();

		intervalId = setInterval(() => {
			console.log('calling every 45 minutes');
			updateRefreshToken();
		}, FOURTYFIVE_MINUTE);
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});

</script>

{#if $isLoggedIn === 'loading'}
<div class="flex justify-center items-center w-full h-screen">
   <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 -mt-32" />
</div>
{:else}
<div class="app" data-theme="lemonade">
   <div class="{$isLoggedIn?"flex flex-col p-8 w-[20%] h-full bg-[#fafafa]":"hidden"}">
      <Nav/>
  </div>
  <div class="flex flex-1 w-full h-full bg-[#F2F7FF]">
      <slot />
  </div>
</div>
{/if}

<style>
   .app{
      @apply flex flex-row h-screen w-screen m-0 p-0 overflow-hidden;
   }
</style>