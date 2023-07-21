<script>
	export let type = 'text';
	export let inputValue = '';
	export let placeholder = '';

	export let onInput;
	export let disabled = false;
	// console.log('input type----------->', type);

	// function typeAction(node) {
	//     node.type = inputType;
	// }
</script>

{#if type === 'password'}
	<input
		type="password"
		class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 text-sub-header text-mono-black"
		{disabled}
		bind:value={inputValue}
		{placeholder}
		on:input={onInput}
	/>
{:else}
	<input
		type="text"
		class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
		{disabled}
		bind:value={inputValue}
		{placeholder}
		on:input={onInput}
	/>
{/if}
<!-- <input class="input" use:typeAction bind:value={inputValue} placeholder={placeholder} on:input={onInput}/> -->
