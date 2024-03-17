import { writable } from "svelte/store";
const api = import.meta.env.VITE_API_URL;

export function fetchAllOrganization() {
    let organization = fetch(api + 'user/orgs', {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if (!response.ok) {   // for status codes like 401, response.ok will be false
            throw new Error('Network response was not ok.'); // this will reject the promise
        }
        return response.json()
    }).then(data => {
        console.log(data.data.data)
        if(data.data.data && data.data.data.length > 0){
            organizationData.set(data);
        }else{
            organizationData.set([]);
        }
    }).catch(error => {
        console.log(error)
        organizationData.set([]);
    });
}

export function searchOrganization(name) {
    let controller = new AbortController();
    let signal = controller.signal;
    let organization = fetch(api + 'search/organizations?name=' + name, {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        signal: signal
    }).then(response => {
        if (!response.ok) {   // for status codes like 401, response.ok will be false
            throw new Error('Network response was not ok.'); // this will reject the promise
        }
        return response.json()
    }).then(data => {
        if(data.data.data && data.data.data.length > 0){
            searchResults.set(data.data.data);
        }else{
            organizationData.set([]);
        }
    }).catch(error => {
        console.log(error)
        organizationData.set([]);
    });

    return controller;
}

export async function createOrganization(payload) {
    try {
        const response = await fetch(api + 'organization', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            // Handle non-2xx status codes
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        await fetchAllOrganization(); // Assuming this is also an async function
        // Success case
        console.log("Organization created successfully");
        return true;
    } catch (error) {
        // Error case
        console.error("Error during organization creation", error);
        organizationData.set([]); // Assuming organizationData is a writable store
        return false;
    }
}

export let organizationData = writable('loading');
export let searchResults = writable('loading');