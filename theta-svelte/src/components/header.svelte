
<svelte:options tag="my-header" />

<script lang="ts">
    import { user } from "./stores.js"
    //export let name
    //var value
    

    console.log("header", $user)
    if ($user == "null") {
      user.set("")
    }
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
  <!--
  <div class="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
    <div class="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
        <div class="sticky top-0 p-4 w-full">
            <ul class="flex sm:flex-col overflow-hidden content-center justify-between">
                 nav goes here
            </ul>
        </div>
    </div>
    <main role="main" class="w-full h-full flex-grow p-3 overflow-auto">
         content area
    </main>
</div>
-->

    <!--sidebar
    <div class=" flex-none rounded-lg shadow drawer h-auto">
      <input id="my-drawer" type="checkbox" class="drawer-toggle"> 
      <div class="flex flex-col items-center justify-center drawer-content">
        <label for="my-drawer" class="btn btn-primary drawer-button">open menu</label>
      </div> 
      <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay"></label> 
        <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <a>Menu Item</a>
          </li> 
          <li>
            <a>Menu Item</a>
          </li>
        </ul>
      </div>
    </div>-->
    <div class="navbar p-2 w-auto shadow-lg bg-neutral text-neutral-content rounded-box">
        <div class="flex-none hidden lg:flex">
          <button for="my-drawer" class="btn btn-square btn-ghost drawer-content drawer-button">
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
        {#if $user == "" || $user == "null"}
        <div class="flex-none">
          <a href="/login">
            <button class="btn btn-ghost text-lg font-bold">
                login
            </button>
          </a>
        </div>
        <div class="flex-none">
          <a href="/register">
            <button class="btn btn-ghost text-lg font-bold">
                register
            </button>
          </a>
        </div>
        {:else}
        <div class="flex-none">
          <a href="/upload">
            <button class="btn btn-ghost text-lg font-bold">
              upload
            </button>
          </a>
        </div>
        <div class="flex-none">
          <a href="/logout">
            <button class="btn btn-ghost text-lg font-bold" on:click={logout}>
                logout
            </button>
          <a href="/logout">
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
        {/if}
      </div>
</main>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>   