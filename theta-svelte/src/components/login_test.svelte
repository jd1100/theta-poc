<svelte:options tag="my-login-form"/>
<svelte:window />
<script lang="ts">
    import { user } from "../stores.js";
    import { onMount } from "svelte";
    export let userName
    var formElement
    var usernameField
    var passwordField
    var user_value
    
    async function uploadFormData(form) {
        let response = await fetch("http://localhost:8001/login", {
            method: "POST",
            //jsonData: content.join(''),
            body: form
        })
        //console.log(response.statusText)
        let result = await response.text();
        
        if (response.status == 200) {
            console.log("iuenrviujenijn")
            console.log(form.get("username"), form.get("password"))
            user.set(usernameField)
            console.log(user_value)
            location.href = "/"
        }
        
    }
    function submitForm(event) {
        //var file = document.getElementById("file").files[0]
        //reader.readAsArrayBuffer(file);
        //console.log(usernameField, passwordField)
        let formData = new FormData()
        formData.append("username", usernameField)
        formData.append("password", passwordField)
        //console.log(formData.get("username"), formData.get("password"))
        uploadFormData(formData)

    }
    
    
    onMount(async () => {
        user.useLocalStorage()
        user.subscribe(value => {
            user_value = value
        })

        if (user_value) {
            console.log(user_value)
            location.href = "/"
        }
    })
   console.log(usernameField, passwordField)  
</script>
<main>
<my-header></my-header>
<div class="flex flex-col items-center justify-center w-auto h-auto bg-neutral-focused text-gray-700">
    <h1 class="font-bold text-2xl text-neutral-content">Welcome Back :)</h1>
    <form bind:this={formElement} id="loginForm" class="flex flex-col bg-neutral-content rounded shadow-lg p-24 mt-24">
        <label class="font-semibold text-xs" for="username">Username or Email</label>
        <input bind:value={usernameField} name="username" class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-4 rounded focus:outline-none focus:ring-2" type="text" required>
        <label class="font-semibold text-xs mt-3" for="password">Password</label>
        <input bind:value={passwordField} name="password" class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-4 rounded focus:outline-none focus:ring-2"type="password" required>
        <button on:click|preventDefault={submitForm} class="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-16 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">Login</button>
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




