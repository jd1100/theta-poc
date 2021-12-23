<svelte:options tag="my-header" />

<script lang="ts">
  import { user } from "./stores.js";
  //export let name
  //var value

  console.log("header", $user);
  if ($user == "null") {
    user.set("");
  }
  function logout() {
    user.set("");
    console.log($user);
  }

  let menu = false;
  function openMenu() {
    console.log("opne menu plz");
    menu = !menu;
  }
</script>

<main>
  <header
    class="lg:px-16 px-6 bg-neutral flex flex-wrap items-center lg:py-0 py-2"
  >
    <div class="flex-1 flex justify-between items-center">
      <img
        class="object-contain h-12 w-full"
        src="https://www.thetatoken.org/assets/logos/theta/large-with-network@2x.png"
        alt="no logo"
      />
    </div>

    <label for="menu-toggle" class="pointer-cursor lg:hidden block">
      <svg class="btn btn-square" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <title>menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
      </svg>
    </label>
    <input class="hidden" type="checkbox" id="menu-toggle" />

    <div class="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
      {#if $user === "" || $user === "null"}
      <nav>
        <ul class="lg:flex items-center justify-between text-base text-neutral-content pt-4 lg:pt-0"> 
          <li>
            <a class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
              href="/login">Login</a>
          </li>
          <li>
            <a class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
              href="/register">Register</a>
          </li>
        </ul>
      </nav>
      {:else}
      <nav>
        <ul class="lg:flex items-center justify-between text-base text-neutral-content pt-4 lg:pt-0">
          <li>
            <a class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
              href="/upload">Upload</a>
          </li>
          <li>
            <a class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400 lg:mb-0 mb-2"
              href="/logout">Logout</a>
          </li>
        </ul>
      </nav>
      <a
        href="#"
        class="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 pointer-cursor"
      >
        <img
          class="rounded-full w-10 h-10 border-2 border-transparent hover:border-indigo-400"
          src="https://pbs.twimg.com/profile_images/1128143121475342337/e8tkhRaz_normal.jpg"
          alt="pfp"
        />
      </a>
      {/if}
    </div>
  </header>
  <!--
<div
  class="relative lg:flex-grow navbar p-2 w-auto shadow-lg bg-neutral text-neutral-content rounded-box"
>
  <div class="flex-none hidden lg:flex">
    <button
      on:click={openMenu}
      class="btn btn-square btn-ghost"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-6 h-6 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </div>
  <div class="flex-none">
    <img
      class="object-contain h-12 w-full"
      src="https://www.thetatoken.org/assets/logos/theta/large-with-network@2x.png"
      alt="no logo"
    />
  </div>
  <div class="flex-none hidden px-2 mx-2 lg:flex">
    <span class="text-lg font-bold"><a href="/">ThetaTube</a></span>
  </div>
  <div class="flex-none lg:flex">
    <div class="form-control">
      <input type="text" placeholder="Search" class="input input-ghost" />
    </div>
  </div>
  <div class="flex-1">
    <button class="btn btn-square btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-6 h-6 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  </div>
  {#if $user == "" || $user == "null"}
    <div class="flex-none">
      <a href="/login">
        <button class="btn btn-ghost text-lg font-bold"> login </button>
      </a>
    </div>
    <div class="flex-none">
      <a href="/register">
        <button class="btn btn-ghost text-lg font-bold"> register </button>
      </a>
    </div>
  {:else}
    <div class="flex-none">
      <a href="/upload">
        <button class="btn btn-ghost text-lg font-bold"> upload </button>
      </a>
    </div>
    <div class="flex-none">
      <a href="/logout">
        <button class="btn btn-ghost text-lg font-bold" on:click={logout}>
          logout
        </button>
        <a href="/logout" /></a
      >
    </div>
    <div class="flex-none">
      <button class="btn btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>
    </div>
    <div class="flex-none">
      <div class="avatar">
        <div class="rounded-full w-10 h-10 m-1">
          <a href="_blank"
            ><img alt="no pic found" src="/static/user_profile.png" /></a
          >
        </div>
      </div>
    </div>
  {/if}
</div>
-->
</main>

<style>
  #menu-toggle:checked + #menu {
    display: block;
  }
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";
</style>
