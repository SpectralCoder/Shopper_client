<script>
   import { goto } from "$app/navigation";
   import { browser } from "$app/environment";
   import { isLoggedIn } from "$stores/UserStore";
   import { updateRefreshToken } from "$stores/UserStore";
   import { onMount, onDestroy } from "svelte";
   import {
      fetchAllOrganization,
      organizationData,
   } from "$stores/OrganizationStore";
   import "./styles.css";
   import Nav from "./nav.svelte";

   $: if (browser && !$isLoggedIn && $isLoggedIn !== "loading") {
      goto("/login");
   }

   let intervalId;

   onMount(() => {
      const FOURTYFIVE_MINUTE = 1 * 60 * 1000 * 45;
      updateRefreshToken();

      intervalId = setInterval(() => {
         console.log("calling every 45 minutes");
         updateRefreshToken();
      }, FOURTYFIVE_MINUTE);
   });

   onDestroy(() => {
      clearInterval(intervalId);
   });

   $: if ($isLoggedIn !== "loading" && $isLoggedIn !== false) {
      fetchAllOrganization();
   }

   $: if ($organizationData !== "loading" && $organizationData.length === 0) {
      goto("/organization/create");
   }
</script>

{#if $isLoggedIn === "loading"}
   <div class="flex justify-center items-center w-full h-screen">
      <div
         class="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-green-300"
         style="border-top-color: transparent"
      />
   </div>
{:else}
   <div class="app" data-theme="lemonade">
      <div
         class={$isLoggedIn
            ? "flex flex-col p-8 w-[20%] h-full bg-[#fafafa]"
            : "hidden"}
      >
         <Nav />
      </div>
      <div class="flex flex-1 w-full h-full bg-[#F2F7FF]">
         {#if $organizationData === "loading"}
            <div class="flex justify-center items-center w-full h-screen">
               <div
                  class="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-green-300"
                  style="border-top-color: transparent"
               />
            </div>
         {:else}
            <slot />
         {/if}
      </div>
   </div>
{/if}

<style>
   .app {
      @apply flex flex-row h-screen w-screen m-0 p-0 overflow-hidden;
   }

   @keyframes spin {
      0% {
         transform: rotate(0deg);
      }
      100% {
         transform: rotate(360deg);
      }
   }
   .animate-spin {
      animation: spin 1s linear infinite;
   }
</style>
