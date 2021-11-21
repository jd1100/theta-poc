<svelte:options tag="list-videos"></svelte:options>
<script lang="ts">
    // imports
    import "./css/tailwind.css"
    import { user } from "./stores.js";
    import { onMount } from "svelte";
    
    // exports
    export let videos;
    // variables

    //var videoData = JSON.stringify(videos)
    var videoData = JSON.parse(videos)
    console.log(videoData)
    var b64JPG = "data:image/jpg;base64,"

</script> 
<my-header></my-header>
<section class="body-font h-auto w-auto">
    <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
        {#each videoData as video, i}
            
            <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                
                <div class="mt-4">
                    <a class="block relative h-48 rounded overflow-hidden" href="/playVideo/{video.Video["id"]}">
                        <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="data:image/jpg;base64,{video["thumbnail"]}">
                    </a>
                    <h2 class="text-primary-content title-font tracking-widest mb-1 break-words"><a href="/playVideo/{video.Video["id"]}">{video["videoName"]}</a></h2>
                    <h3 class="prose-base-content text-sm tracking-widest"><a href="_blank">{video["username"]}</a></h3>
                    <p class="mt-1">{i}</p>
                </div>
            </div>
            <!--
                // pagination

                {#if i == numberOfVideosDisplayedPerPage}
                    // grab next page - call a function that makes 
                    post request with a url variable that is an increment
                    of the current page number varibale
                    TODO: create page variable 

                    {grabNextPage}

                {/if}
            -->
        {/each}
        </div>
        <div class="flex justify-center mt-110 space-x-1">
            <button class="flex items-center justify-center h-8 w-8 rounded text-gray-400">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
            </button>
            <button class="flex items-center justify-center h-8 px-2 rounded text-sm font-medium text-gray-400" disabled>
                Prev
            </button>
            <button class="flex items-center justify-center h-8 w-8 rounded bg-indigo-200 text-sm font-medium text-indigo-600" disabled>
                1
            </button>
            <button class="flex items-center justify-center h-8 w-8 rounded hover:bg-indigo-200 text-sm font-medium text-gray-600 hover:text-indigo-600">
                2
            </button>
            <button class="flex items-center justify-center h-8 w-8 rounded hover:bg-indigo-200 text-sm font-medium text-gray-600 hover:text-indigo-600">
                3
            </button>
            <button class="flex items-center justify-center h-8 px-2 rounded hover:bg-indigo-200 text-sm font-medium text-gray-600 hover:text-indigo-600">
                Next
            </button>
            <button class="flex items-center justify-center h-8 w-8 rounded hover:bg-indigo-200 text-gray-600 hover:text-indigo-600">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
</section>
<my-footer></my-footer>



<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>