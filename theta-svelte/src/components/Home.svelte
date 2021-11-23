
<svelte:options tag="my-element" />

<script lang="ts">

	import { user } from "./stores.js"
	export let name;
	var user_value
	//import './css/tailwind.pcss';
	user.subscribe(value => {
		user_value = value;
	});
</script>

<main>
	<my-header></my-header>
	welcome to theta poc
	<br>
	{#if user_value }
		<h1>hello {name}!</h1>
		<br>
		<a href="/upload" id="uploadButton">upload video</a>
		<br>
	{/if}
	{#if user_value }
	<a href="/logout">logout</a>
	<br>
	{:else}
	<a href="/login">login</a>
	<br>
	<a href="/register">register</a>
	<br>
	{/if}
	<a href="/videos">watch uploaded videos</a>
	
	<my-footer></my-footer>
</main>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
}

h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
}

@media (min-width: 640px) {
    main {
        max-width: none;
    }
}
</style>