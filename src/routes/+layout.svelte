<script>
   import { goto } from '$app/navigation';
   import { browser } from '$app/environment';
   import {isLoggedIn} from '../lib/store/UserStore';
   import "./styles.css";
   import Nav from "./nav.svelte";
   $: if (browser && !$isLoggedIn){
      goto('/login');
    }


</script>
<div class="app" data-theme="lemonade">
   <div class="{$isLoggedIn?"flex flex-col p-8 w-[20%] h-full bg-[#fafafa]":"hidden"}">
      <Nav/>
  </div>
  <div class="flex flex-1 w-full h-full bg-[#F2F7FF]">
      <slot />
  </div>
</div>

<style>
   .app{
      @apply flex flex-row h-screen w-screen m-0 p-0 overflow-hidden;
   }
</style>