<svelte:options tag="play-video" />
<svelte:head>
  <script type="application/javascript" src="https://d1ktbyo67sh8fw.cloudfront.net/js/theta.umd.js"></script>
  <script type="application/javascript" src="https://d1ktbyo67sh8fw.cloudfront.net/js/theta-hls-plugin.umd.js"></script>
  <script type="application/javascript" src="https://d1ktbyo67sh8fw.cloudfront.net/js/videojs-theta-plugin.min.js"></script>
  <!-- Optional - Include Theta Web Widget -->
  <script type="application/javascript" src="https://theta-web-widgets.thetatoken.org/js/ThetaWebWidgets.js"></script>
</svelte:head>



<script lang="ts">
  export let url: string;
  console.log({ url });
  ///////////////////
</script>
<main>
  <a href="/videos">back</a>
  <hr>
  <a href="/">home</a>
  <!-- Notice we turned off controls? We're supplying our own, so we hide the native ones. -->

  <vm-player id="vm-player-4" icons="vime" controls>
    <vm-hls id="player" libSrc="https://d1ktbyo67sh8fw.cloudfront.net/js/theta-hls-plugin.umd.js" poster="/media/poster.png">
      <source data-src={url} type="application/x-mpegURL" data-vs={url} />
    </vm-hls>


  </vm-player>
  <section id="content">
    <!-- Optional - For Theta Web Widget -->
    <iframe title="thetaWidget" src="https://theta-web-widgets.thetatoken.org/widgets/overview-with-traffic-chart?theme=light&widget-id=p72j6mf30&show-tfuel-help-button=false&main-message=%20&language=en&show-gamma-help-button=false" style="width: 100%; height: 268px;" scrolling="no" frameborder="0"></iframe>
  </section>
</main>

<style>

</style>