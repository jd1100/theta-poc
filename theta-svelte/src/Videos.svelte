<svelte:options tag="list-videos"></svelte:options>
<script lang=ts>
    export let videos;
    var tempURL

    var videoData = JSON.parse(videos)
    console.log(videoData)



    /*for (var i=0; i < data.length;i++) {
        console.log(data[i])
    }*/

</script> 
<section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
        {#each videoData as video, i}
            
            <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a href="/playVideo/{video.Video["id"]}" class="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="{video["thumbnail"]}">
                </a>
                <div class="mt-4">
                    <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{video.Video["create_time"]}</h3>
                    <h2 class="text-gray-900 title-font text-lg font-medium">{video["username"]}</h2>
                    <p class="mt-1">{i}</p>
                </div>
            </div>
        {/each}
        </div>
    </div>
</section>



<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>