

<svelte:options tag="my-register-form"/>

<script lang="ts">
    export let register_message: string

</script>

<main>
<my-header></my-header>
<div class="flex flex-col items-center justify-center w-auto h-auto bg-neutral-focused text-gray-700">
    {#if register_message}
    <h1 class="font-bold text-2xl text-neutral-content">{register_message}</h1>
    {:else}
    <h1 class="font-bold text-2xl text-neutral-content">Welcome :)</h1>
    {/if}
    <form  id="registerForm" class="flex flex-col bg-neutral-content rounded shadow-lg p-24 mt-24" action="/register" method="post">
        <label class="font-semibold text-xs" for="username">Username</label>
        <input name="username" class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-4 rounded focus:outline-none focus:ring-2" type="text" required>
        <label class="font-semibold text-xs mt-3" for="email">Email</label>
        <input name="email" class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-4 rounded focus:outline-none focus:ring-2" type="email" required>
        <label class="font-semibold text-xs mt-3" for="email">Password</label>
        <input name="password" class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-4 rounded focus:outline-none focus:ring-2" type="password" required>
        <button class="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-16 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">Register</button>
        <div class="flex mt-6 justify-center text-xs">
            <a class="text-blue-400 hover:text-blue-500" href="/login">Sign In</a>
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