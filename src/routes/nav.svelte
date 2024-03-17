<script>
	// import page  from 'page';
	import ShopperIcon from '../lib/components/icons/shopper.svelte';
	import DashboardIcon from '../lib/components/icons/dashboard.svelte';
	import SalesIcon from '../lib/components/icons/SaleIcon.svelte';
	import CustomerIcon from '../lib/components/icons/CustomerIcon.svelte';
	import InventoryIcon from '../lib/components/icons/InventoryIcon.svelte';
	import { goto } from "$app/navigation";
	import { page } from '$app/stores';

	let menu = [
		{ key: 'dashboard', title: 'Dashboard', component: DashboardIcon, path: '/dashboard' },
		{ key: 'sales', title: 'Sales', component: SalesIcon, path: '/sales' },
		{ key: 'customer', title: 'Customer', component: CustomerIcon, path: '/customer' },
		{ key: 'inventory', title: 'Inventory', component: InventoryIcon, path: '/inventory' }
	];

	let selected = menu[0].key;

	function navigateTo(item) {
		// page(item.path);
		goto(item.path);
	}

	function onRouteUpdate(page) {
		selected = menu.find((item) => item.path === page.url.pathname)?.key;
      console.log("page", page.url.pathname);
   }

   $: onRouteUpdate($page);
</script>

<div class="flex w-full">
	<ShopperIcon />
</div>
<ul class="menu w-full mt-4">
	{#each menu as item}
		<li class="item-style" on:click|stopPropagation={()=> navigateTo(item)}>
			<a class="rounded-xl {item.key === selected ? 'active ' : ''} hover:rounded-xl">
				<svelte:component this={item.component} />
				{item.title}
			</a>
		</li>
	{/each}
</ul>

<style>
	.item-style {
		@apply border-b rounded-b-xl border-b-success hover-bordered;
	}
</style>
