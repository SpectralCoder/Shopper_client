<script>
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
  
    export let show = false;
    export let duration = 3000; // default duration in milliseconds
    export let message = 'Request submitted successfully!';
    export let style = '';
    export let hideTooltip; // Function reference to trigger hiding

    
    $: if (show) {
        setTimeout(hideTooltip, duration);
    }
  </script>
  
  {#if show}
    <div
      class="fixed top-16 right-16 p-4 bg-primary text-base-100 rounded shadow-lg {style}"
      transition:fade
    >
      <p>{message}</p>
    </div>
  {/if}