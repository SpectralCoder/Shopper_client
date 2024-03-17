<script>
	import Input from '$lib/components/Input.svelte';
	import { isLoggedIn } from '../../lib/store/UserStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { SignIn} from '../../lib/store/UserStore';
	export let flipped;

	$: if (browser && $isLoggedIn) {
		goto('/');
	}

	let data = [
		{
			key: 'email',
			title: 'Email',
			value: '',
			placeholder: 'skmujibur@example.com',
			type: 'text',
			output_type: 'str'
		},
		{
			key: 'password',
			title: 'password',
			value: '',
			placeholder: 'password',
			type: 'password',
			output_type: 'str'
		},
	]

	async function submitData() {
		let result = data.reduce((obj, item) => {
			obj[item.key] = item.value;
			return obj;
			}, {});
		if(await SignIn(result)){
			isLoggedInUser();
			goto('/')
		}
		else{
			console.log('failed')
		}
	}
</script>

<div class="md:mx-6 md:px-12 md:py-4 flip-card-front">
	<div class="text-center">
		<img class="mx-auto w-48" src="/shopperFavIcon.svg" alt="logo" />
		<h4 class="mb-8 mt-1 pb-1 text-2xl font-semibold">
			<span
				class="text-transparent text-3xl bg-clip-text text-[#576319]"
				>Shopper :</span
			> Unleash the True Potential of Your Business
		</h4>
	</div>

	<form class="lg:px-12">
		<!--Username input-->
		{#each data as item}
		<div class="relative mb-6">
			<Input
				type="{item.type}"
				bind:inputValue={item.value}
				placeholder={item.placeholder}
			/>

			<label
				for="exampleFormControlInput1"
				class="w-full pointer-events-none absolute left-0 top-0 mb-0 max-w-[100%] origin-[0_0] truncate pt-[-1rem] leading-[1.6] transition-all duration-200 text-left pl-2 py-2   {item.value
					? 'scale-[0.8] text-[#576319] ease-out translate-y-[-1rem] motion-reduce:transition-none pl-0'
					: 'border border-[#576319] rounded-lg peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-[#576319] peer-data-[te-input-state-active]:-translate-y-[0.9rem]'} peer-focus:border-none peer-focus:pl-0"
				>{item.title}
			</label>
		</div>
	{/each}

		<!--Submit button-->
		<div class="mb-12 pb-1 pt-1 text-center">
			<button
				class="mb-3 inline-block w-full bg-[#576319] rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
				type="button"
				data-te-ripple-init
				data-te-ripple-color="light"
				on:click={submitData}

			>
				Log in
			</button>

			<!--Forgot password link-->
			<a href="#!">Forgot password?</a>
		</div>

		<!--Register button-->
		<div class="flex items-center justify-between pb-6" on:click={() => (flipped = !flipped)}>
			<p class="mb-0 mr-2">Don't have an account?</p>
			<button
				type="button"
				class="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
				data-te-ripple-init
				data-te-ripple-color="light"
			>
				Register
			</button>
		</div>
	</form>
</div>
