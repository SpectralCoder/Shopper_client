<script>
    import "./styles.css";
    import Nav from "./nav.svelte"
</script>
<div class="app bg-[#fafafa]" data-theme="lemonade">
   <div class="flex flex-col p-8 w-[20%] h-full bg-accent">
      <Nav/>
  </div>
  <div class="flex flex-1">
      <slot />
  </div>
</div>

<style>
   .app{
      @apply flex flex-row h-screen w-screen m-0 p-0 overflow-hidden;
   }
</style>