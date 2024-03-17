<script>
    import { writable } from "svelte/store";
    import {
        searchResults,
        searchOrganization,
        createOrganization,
    } from "$stores/OrganizationStore.js";
    import  SuccessMessageTooltip  from "$lib/components/SuccessMessageTooltip.svelte";

    let form = writable({
        name: "",
        address: "",
        phone: "",
        email: "",
    });

    let organizations;
    let showDropdown = writable(false);
    let showSuccessTooltip = false;
    let tooltipMessage = "";
    let tooltipStyle = "";

    organizations = writable([]);

    const searchForOrganization = async (value) => {
        if (value.length < 3) {
            searchResults.set([]);
            showDropdown.set(false);
            return;
        }
        showDropdown.set(true);
        await searchOrganization(value);
    };

    const autofillForm = (org) => {
        console.log(org);
        form.set(org);
        toggleDropdown();
    };

    const toggleDropdown = () => {
        showDropdown.update((n) => !n);
    };

    const handleSubmit = async () => {
        let formData = $form;
        if(typeof formData.phone === 'string' && formData.phone.length === 0){
            const numericPhone = formData?.phone?.replace(/\D/g, ''); // Remove non-digit characters
            if(numericPhone) formData.phone = parseInt(numericPhone, 10);
        }
        if(await createOrganization(formData)){
            showSuccessTooltip=true;
            tooltipMessage="Organization created successfully!";
            tooltipStyle="bg-suceess";
        }else{
            showSuccessTooltip=true;
            tooltipMessage="Organization creation failed!";
            tooltipStyle="bg-error";
        }
    };

    const closeDropdown = () => {
        showDropdown.set(false);
    };

    function hideTooltip() {
        showSuccessTooltip = false;
    }
</script>

<div class="container mx-auto md:py-12 md:px-16 p-4">
    <div class="w-full md:max-w-md mx-auto mb-10">
        <div class="relative text-gray-600">
            <input
                type="search"
                class="h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full bg-base placeholder-gray-700 shadow-md"
                placeholder="Search for your organization"
                on:input={({ target }) => searchForOrganization(target.value)}
            />

            <!-- Dropdown Results -->
            {#if $showDropdown}
                <button
                    class="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-r-full focus:outline-none"
                    on:click={closeDropdown}
                >
                    <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {#if $searchResults.length === 0}
                <div class=" absolute z-10 bg-white shadow-md rounded-md w-full p-10 flex flex-col items-center justify-center text-neutral">
                    <svg
                      class=" h-8 w-8 mb-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <!-- Simple circular path for the animation -->
                      <path
                        d="M12 4V6M16.24 7.76L15.12 9.12M18 12H16M16.24 16.24L15.12 14.88M12 18V16M7.76 16.24L9.12 15.12M6 12H8M7.76 7.76L9.12 8.88"
                        stroke="#519903"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p class="text-sm">No Organization found for your search.</p>
                  </div>
                {:else}
                    <div
                        class="absolute z-10 bg-white shadow-md mt-1 rounded-md w-full max-h-64 overflow-auto"
                    >
                        {#each $searchResults as result (result.id)}
                            <button
                                class="p-4 hover:bg-gray-100 cursor-pointer flex flex-col w-full"
                                on:click={() => autofillForm(result)}
                            >
                                <strong class="text-lg text-neutral"
                                    >{result.name}</strong
                                >
                                <p class="text-sm text-gray-600">
                                    {result.address}
                                </p>
                                <p class="text-sm text-gray-600">
                                    {result.phone}
                                </p>
                            </button>
                        {/each}
                    </div>
                {/if}
            {/if}
        </div>
    </div>

    <form
        class="w-full md:max-w-xl mx-auto mt-10 bg-base-100 rounded-xl p-6 shadow-lg"
        on:submit|preventDefault={handleSubmit}
    >
        <h2 class="text-2xl font-bold text-neutral mb-8 text-center">
            Create Organization
        </h2>
        <div class="flex flex-wrap -mx-2 mb-6">
            <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-name"
                >
                    Organization Name*
                </label>
                <input
                    class="appearance-none block w-full bg-base text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-name"
                    type="text"
                    placeholder="Lemonade Inc."
                    bind:value={$form.name}
                    required
                />
            </div>
            <div class="w-full md:w-1/2 px-2">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-email"
                >
                    Email Address*
                </label>
                <input
                    class="appearance-none block w-full bg-base text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-email"
                    type="email"
                    placeholder="contact@lemonade.com"
                    bind:value={$form.email}
                />
            </div>
        </div>
        <div class="flex flex-wrap -mx-2 mb-6">
            <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-address"
                >
                    Address*
                </label>
                <input
                    class="appearance-none block w-full bg-base text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    id="grid-address"
                    type="text"
                    placeholder="1234 Lemon St."
                    bind:value={$form.address}
                    required
                />
            </div>
            <div class="w-full md:w-1/2 px-2">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-phone"
                >
                    Phone*
                </label>
                <input
                    class="appearance-none block w-full bg-base text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone"
                    type="text"
                    placeholder="01708083429"
                    bind:value={$form.phone}
                    pattern="\d*"
                    minlength="10"
                    required
                />
            </div>
        </div>
        <div class="md:flex md:items-center">
            <div class="md:w-1/3">
                <button
                    class="shadow bg-primary hover:bg-secondary focus:shadow-outline focus:outline-none text-base-100 font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    Submit
                </button>
            </div>
            <div class="md:w-2/3" />
        </div>
    </form>
</div>
<SuccessMessageTooltip bind:show={showSuccessTooltip} {hideTooltip} message={tooltipMessage} style={tooltipStyle}/>
