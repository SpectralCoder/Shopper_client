import { writable } from "svelte/store";
const api = import.meta.env.VITE_API_URL;

export function updateRefreshToken() {
    let refresh = fetch(api + 'refresh', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if (!response.ok) {   // for status codes like 401, response.ok will be false
            throw new Error('Network response was not ok.'); // this will reject the promise
        }
        return response.json()
    }).then(data => {
        isLoggedIn.set(true);
        userData.set(data);
    }).catch(error => {
        isLoggedIn.set(false);
    });
}

export async function SignIn(data) {
    console.info(data)
    let isSuccess = false;
    try {
        const response = await fetch(api + 'users/login', {
            method: 'POST',
            credentials: 'include', // include cookies in the request
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        let fetchedData = await response.json();
        isLoggedIn.set(true);
        userData.set(fetchedData);
        isSuccess = true;

    } catch (error) {
        console.log(error, "called here");
        isLoggedIn.set(false);
        isSuccess = false;
    }
    return isSuccess;
}


export async function SignUp(data) {
    try {
        const response = await fetch(api + 'users/signup', {
            method: 'POST',
            credentials: 'include', // include cookies in the request
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        let fetchedData = await response.json();
        isLoggedIn.set(true);
        userData.set(fetchedData);

    } catch (error) {
        isLoggedIn.set(false);
    }
}

export let isLoggedIn = writable('loading');
export let userData = writable({});