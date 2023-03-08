import { writable } from 'svelte/store';

export let wwwAdress:any = writable();
export let showSaveButton = writable(false)