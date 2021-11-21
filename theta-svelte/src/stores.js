import { writable, readable } from 'svelte/store';



const storedUser = localStorage.getItem("user");
export let user = writable(storedUser);
user.subscribe(value => {
  localStorage.setItem("user", value);
});
//export const user = writable('user', 0);