
<svelte:options tag="my-header" />

<script lang="ts">
    import { user } from "../stores.js"
    //export let name
    //var value
    

    console.log("header", $user)
    function logout() {
      user.set('')
      console.log($user)
    }
    //console.log("header export", )
    /*
    onMount(() => {
      return user.subscribe(value => {
        user_value = value
      })
    })
    */
</script>  

<main>
    <div class="navbar p-2 w-auto shadow-lg bg-neutral text-neutral-content rounded-box">
        <div class="flex-none hidden lg:flex">
          <button class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">           
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>               
            </svg>
          </button>
        </div>
        <div class="flex-none">
            <img class="object-contain h-12 w-full" src="https://www.thetatoken.org/assets/logos/theta/large-with-network@2x.png" alt="no logo">
        </div>
        <div class="flex-none hidden px-2 mx-2 lg:flex"> 
            <span class="text-lg font-bold"><a href="/">ThetaTube</a></span>
        </div>
        <div class="flex-none lg:flex">
          <div class="form-control">
            <input type="text" placeholder="Search" class="input input-ghost">
          </div>
        </div> 
        <div class="flex-1">
          <button class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">             
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>             
            </svg>
          </button>
        </div>
        {#if $user}
        <div class="flex-none">
            <button class="btn btn-ghost">
                <span class="text-lg font-bold"><a href="/upload">upload</a></span>
            </button>
        </div>
        <div class="flex-none">
            <button class="btn btn-ghost" on:click={logout}>
                <span class="text-lg font-bold"><a href="/logout">logout</a></span>
            </button>
        </div>
        <div class="flex-none">
          <button class="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">     
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>                     
            </svg>
          </button>
        </div> 
        <div class="flex-none">
          <div class="avatar">
            <div class="rounded-full w-10 h-10 m-1">
              <a href="_blank"><img alt="no pic found" src="/static/user_profile.png"></a>
            </div>
          </div>
        </div>
        {:else}
        <div class="flex-none">
            <button class="btn btn-ghost">
                <span class="text-lg font-bold"><a href="/login">login</a></span>
            </button>
        </div>
        <div class="flex-none">
            <button class="btn btn-ghost">
                <span class="text-lg font-bold"><a href="/register">register</a></span>
            </button>
        </div>
        {/if}
      </div>
</main>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>   