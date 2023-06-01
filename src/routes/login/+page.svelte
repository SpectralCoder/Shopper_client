<script>
	import { isLoggedIn } from '../../lib/store/UserStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	import SignIn from './SignIn.svelte';
	import SignUp from './SignUp.svelte';

	$: if (browser && $isLoggedIn) {
		goto('/');
	}

	let flipped = false;
</script>

<div class="flex w-full h-full items-center justify-center">
	<section class="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
		<div class="container h-full p-10">
			<div
				class="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200"
			>
				<div class="w-full">
					<div class="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
						<div class="g-0 lg:flex lg:flex-wrap">
							<div
								class="hidden items-center rounded-t-lg lg:w-6/12 lg:rounded-l-lg lg:rounded-tr-none lg:flex "
								style="background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
							>
								<div class="px-4 py-6 text-white md:mx-6 md:p-12">
									<h4 class="mb-6 text-sub-header">The Future of CRM Has Arrived</h4>
									<p class="text-paragraph">
										Discover the ultimate CRM solution tailored for your business - ShopperCRM.
										Seamlessly manage customer relationships, streamline operations, and boost sales
										effortlessly. Gain valuable insights to personalize customer experiences and
										drive exceptional growth. Experience the power of seamless integration,
										actionable analytics, and outstanding support. Join countless businesses who
										have transformed their success with ShopperCRM. Elevate your business to new
										heights with our game-changing CRM platform!
									</p>
								</div>
							</div>
							<div
								class="px-4 md:px-0 lg:w-6/12"
								class:flipped
							>
								<div class="flip-card">
									<div class="flip-card-inner">
										<div class="flip-card-front {flipped?"hidden":"flex"}">
											<SignIn bind:flipped/>
										</div>
										<div class="flip-card-back {flipped?"flex":"hidden"}">
											<SignUp bind:flipped/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	/* Flip card toggle */
	.flip-card {
		background-color: transparent;
		perspective: 1000px;
		cursor: pointer;
		user-select: none;
	}

	.flip-card-inner {
		position: relative;
		text-align: center;
		transition: transform 0.6s;
		transform-style: preserve-3d;
	}

	.flipped .flip-card .flip-card-inner {
		transform: rotateY(180deg);
	}

	.flip-card-front,
	.flip-card-back {
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.flip-card-back {
		transform: rotateY(180deg);
	}
</style>
