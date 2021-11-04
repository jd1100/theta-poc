
<svelte:options tag="play-video"/>

<script lang="ts">
    import { Player, DefaultUi, Video } from '@vime/svelte';
    export let videoURL
    
</script>

<main>
	Video Player
    <Player controls>
        <Video crossOrigin="" poster="https://media.vimejs.com/poster.png">
          <!-- These are passed directly to the underlying HTML5 `<video>` element. -->
          <!-- Why `data-src`? Lazy loading, you can always use `src` if you prefer.  -->
          <source data-src={videoURL} type="video/mp4" />
          <track
            default
            kind="captions"
            srclang="en"
            label="English"
          />
        </Video>
      
        <!-- ... -->
      </Player>
</main>

<style>
    /* Default theme. ~960B */
    @import '../../../node_modules/@vime/core/themes/default.css';

    /* Optional light theme (extends default). ~400B */
    @import '../../../node_modules/@vime/core/themes/light.css';
</style>