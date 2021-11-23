import { writable, readable } from 'svelte/store';



const storedUser = localStorage.getItem("user");
export let user = writable(storedUser);
user.subscribe(value => {
  localStorage.setItem("user", value);
});

const storedVideoID = localStorage.getItem("videoID");
export let currentVideoID = writable(storedVideoID);
currentVideoID.subscribe(value => {
  localStorage.setItem("videoID", value);
});
//export const user = writable('user', 0);