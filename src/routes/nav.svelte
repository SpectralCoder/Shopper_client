<script>
	import ShopperIcon from '../lib/components/icons/shopper.svelte';
	import DashboardIcon from '../lib/components/icons/dashboard.svelte';
	import SalesIcon from '../lib/components/icons/SaleIcon.svelte';
	import CustomerIcon from '../lib/components/icons/CustomerIcon.svelte';
	import InventoryIcon from '../lib/components/icons/InventoryIcon.svelte';

	let menu = [
		{
			key: 'dashboard',
			title: 'Dashboard',
			component: DashboardIcon
		},
		{
			key: 'sales',
			title: 'Sales',
			component: SalesIcon
		},
		{
			key: 'customer',
			title: 'Customer',
			component: CustomerIcon
		},
		{
			key: 'inventory',
			title: 'Inventory',
			component: InventoryIcon
		}
	];

	let selected = menu[0].key;
</script>

<div class="flex w-full">
	<ShopperIcon />
</div>
<ul class="menu w-full mt-4">
	{#each menu as item}
		<li class="item-style" on:click|stopPropagation={()=>{selected=item.key}}>
			<a class="rounded-xl {item.key == selected ? 'active ' : 'hover:rounded-xl'} ">
                <svelte:component this={item.component}/>
                {item.title}</a>
		</li>
	{/each}
</ul>

<style>
	.item-style {
		@apply border-b rounded-b-xl border-b-success hover-bordered;
	}
</style>
