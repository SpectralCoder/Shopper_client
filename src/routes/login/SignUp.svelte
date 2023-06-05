<script>
	import Input from '../../lib/components/Input.svelte';
	export let flipped;
	let error = {};
	let data = [
		{
			key: 'name',
			title: 'Name',
			value: '',
			placeholder: 'Sheikh Mujibur Rahman',
			type: 'text',
			output_type: 'str'
		},
		{
			key: 'nid_no',
			title: 'NID No.',
			value: '',
			placeholder: '491202789140526',
			type: 'number',
			output_type: 'int'
		},
		{
			key: 'email',
			title: 'Email',
			value: '',
			placeholder: 'skmujibur@example.com',
			type: 'text',
			output_type: 'str'
		},
		{
			key: 'phone',
			title: 'Phone No.',
			value: '',
			placeholder: '+8801700432125',
			type: 'number',
			output_type: 'int'
		},
		{
			key: 'password',
			title: 'Password',
			value: '',
			placeholder: '',
			type: 'password',
			output_type: 'str'
		},
		{
			key: 'cpassword',
			title: 'Confirm Password',
			value: '',
			placeholder: '',
			type: 'password',
			output_type: 'str'
		}
	];

	function validateCheck(type, key, value, addErr = true) {
		console.info(key,value, addErr);
		if (key == 'phone') {
			const regex = /^(\+88|0088)?(01){1}[3456789]{1}(\d){8}$/;
			let parsedInt = parseInt(value)
			if (!isNaN(parsedInt) && regex.test(parsedInt) && value) {
				console.info(value);
				if (key in error) {
					delete error[key];
				}
			} else if (addErr) {
				error[key] = 'Input a valid number';
			}
		} else if (key == 'email') {
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (emailPattern.test(value)) {
				if (key in error) {
					delete error[key];
				}
			} else if (addErr) {
				error[key] = 'Input a valid email';
			}
		} else if (key == 'password') {
			const lengthPattern = /^.{6,}$/;
			const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
			const numberPattern = /[0-9]/;
			if (
				lengthPattern.test(value) &&
				specialCharPattern.test(value) &&
				numberPattern.test(value)
			) {
				if (key in error) {
					delete error[key];
				}
			} else if (addErr) {
				error[key] =
					'Input must be greater than 6 digit and have atleast a number and special character';
			}
		} else if (key == 'cpassword') {
			let pass = '';
			for (let i = 0; i < data.length; i++) {
				if (data[i].key == 'password') {
					pass = data[i].value;
					break;
				}
			}
			if (value == pass && value) {
				if (key in error) {
					delete error[key];
				}
			} else if (addErr) {
				error[key] = "doesn't match with the password";
			}
		} else if (key == 'nid_no') {
			let parsedInt = parseInt(value)
			if (Number.isInteger(parsedInt)) {
				if (key in error) {
					console.info(error);
					delete error[key];
					console.info(error);
				}
			} else if (addErr) {
				error[key] = 'Please, Input a valid NID no.';
			}
		} else if (key == 'name') {
			const regex = /^[A-Za-z\s']+$/;
			if (regex.test(value)) {
				if (key in error) {
					delete error[key];
				}
			} else if (addErr) {
				error[key] = 'Input a valid name';
			}
		}

		error = error;
	}

	function submitData() {
		for (let i = 0; i < data.length; i++) {
			validateCheck(data[i].type, data[i].key, data[i].value);
		}
		if (Object.keys(error).length > 0) return;
		console.info('will submit data');
	}
</script>

<div class="md:mx-6 md:px-12 md:py-4 w-full h-full">
	<div class="w-full pt-6 mt-2 h-4 mb-2 bg-gradient-to-r from-[#a8e063] to-[#56ab2f]" />
	<img class="mx-auto w-48 mb-2" src="shopperFavIcon.svg" alt="logo" />
	<form class="p-4">
		<div class="grid grid-cols-2">
			{#each data as item}
				<div class="relative mb-6">
					<Input
						type="{item.type}"
						bind:inputValue={item.value}
						placeholder={item.placeholder}
						onInput={() => validateCheck(item.type, item.key, item.value, false)}
					/>
					<label
						for="exampleFormControlInput1"
						class="w-full pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[-1rem] leading-[1.6] text-neutral-500 transition-all duration-200 text-left pl-2 py-2   {item.value
							? "scale-[0.8] ease-out text-primary translate-y-[-1rem] motion-reduce:transition-none pl-0"
							: `border ${error[item.key]?"border-error":"border-primary"} rounded-lg peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem]`} peer-focus:border-none peer-focus:pl-0"
						>{item.title}
					</label>
					{#if error[item.key] && item.value}
					<div class="text-error text-xs text-left">
						{error[item.key]}
					</div>
						
					{/if}
				</div>
			{/each}
		</div>

		<div class="mb-12 pb-1 pt-1 text-center w-full">
			<button
				class="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
				type="button"
				data-te-ripple-init
				data-te-ripple-color="light"
				style="
      background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
    "
				on:click={submitData}
			>
				sign up
			</button>
		</div>
	</form>
	<div class="flex items-center justify-between pb-6" on:click={() => (flipped = !flipped)}>
		<p class="mb-0 mr-2 text-primary pl-6">Already have an account?</p>
		<button
			type="button"
			class="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
			data-te-ripple-init
			data-te-ripple-color="light"
		>
			Login
		</button>
	</div>
</div>
