
<svelte:options tag="my-login"></svelte:options>

<script lang="ts">
    import { user } from "../stores";
    import { onMount } from "svelte";
    export let username: string;
    var formElement
    var usernameField
    var passwordField
    var errorMessage

    if (username) {
        console.log(username)
        if (username === "incorrect username or password" ) {
            errorMessage = username;
        } else {
            console.log("biwoenrvion")
            user.set(username)
            console.log("user store = ", $user)
        }
        //location.href = "/"
    } else {
        console.log("user not logged in")
        user.set('')
    }
    
    

</script>
<main>
<my-header></my-header>
<div class="flex flex-col items-center justify-center w-auto h-auto bg-neutral-focused text-gray-700">
    {#if errorMessage}
    <h1 class="font-bold text-2xl text-neutral-content">{errorMessage}</h1>
    {:else}
    {#if $user}
    <h1 class="font-bold text-2xl text-neutral-content">Welcome Back :) {$user}</h1>
    {:else}
    <h1 class="font-bold text-2xl text-neutral-content">Welcome Back :)</h1>
    {/if}
    {/if}
    <form bind:this={formElement} id="loginForm" class="flex flex-col bg-neutral-content rounded shadow-lg p-24 mt-24 pb-24" action="/login" method="post">
        <label class="font-semibold text-xs" for="username">Username or Email</label>
        <input bind:value={usernameField} name="username" class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-4 rounded focus:outline-none focus:ring-2" type="text" required>
        <label class="font-semibold text-xs mt-3" for="password">Password</label>
        <input bind:value={passwordField} name="password" class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-4 rounded focus:outline-none focus:ring-2"type="password" required>
        <button type="submit" class="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-16 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">Login</button>
        <div class="flex mt-6 justify-center text-xs">
            <a class="text-blue-400 hover:text-blue-500" href="_blank">Forgot Password</a>
            <span class="mx-2 text-gray-300">/</span>
            <a class="text-blue-400 hover:text-blue-500" href="/register">Sign Up</a>
        </div>
    </form>
</div>
<my-footer></my-footer>

</main>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>