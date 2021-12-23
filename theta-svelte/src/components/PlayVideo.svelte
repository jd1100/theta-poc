<svelte:options tag="play-video" />
<svelte:head>
</svelte:head>

<script lang="ts">
  export let videos
  import { currentVideoID } from "./stores.js"
  import { onMount } from "svelte"
  import ThetaWebWidgets from "../theta/thetaWebWidget"
  import loadjs from "loadjs"

        // define a dependency bundle and execute code when it loads
  loadjs([
    "/static/theta/hls.js",
    "/static/theta/theta.umd.js",
    "/static/theta/theta-hls-plugin.umd.js",
    "/static/theta/videojs-theta-plugin.min.js",
  ], 'foobar', {
    async: false
  });

  loadjs.ready('foobar', function() {
    startApp()
  });

  //console.log({ url });
  ///////////////////
  var player
  var theta 
  var thetaWidgetPlaceholder
  var videoID
  var url
  var thumbnailElement
  var titleElement
  var videoData

  //var videoID = url.replace(/https:\/\/media.thetavideoapi.com\//, "")
  //videoID = videoID.replace(/\/master.m3u8/, "")
  //console.log(videoID)

  videoID = $currentVideoID;
  console.log(videoID)
  url = "https://media.thetavideoapi.com/" + $currentVideoID + "/master.m3u8"
  
  videoData = JSON.parse(videos)
  console.log(videos)
  
  const optionalHlsOpts = null;
  const optionalThetaOpts = {
    allowRangeRequests: true, // false if cdn does not support range headers  
  };


  console.log(videos)
  console.log(videoID)
  console.log(url)
  console.log("ayo wasup den")
  console.log("wasup den")
  const PEER_SERVER_HOST = "prod-theta-peerjs.thetatoken.org";
  const PEER_SERVER_PORT = 8700;
  const TRACKER_SERVER_HOST = "prod-testnet-grouping.thetatoken.org";
  const TRACKER_SERVER_PORT = 8700;

  //const PLATFORM_THETA_WALLET_SERVICE_URL = "http://localhost:3000";

  // TODO Fill these in with your data
  const VIDEO_ID = videoID
  //const VIDEO_URL = "https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8";
  const VIDEO_URL = url

  //const ThetaWalletConnect = require("@thetalabs/theta-wallet-connect");
  //const accounts = await ThetaWalletConnect.requestAccounts();
  // --------- Guest User Helpers ------------


  function generateGuestUserIdIfNeeded() {
    let guestUserId = localStorage.getItem("THETA_EXAMPLE_GUEST_USER_ID");
    if (guestUserId === null) {
        var guestID = "" + (new Date().getTime());
        localStorage.setItem("THETA_EXAMPLE_GUEST_USER_ID", guestID);
    }
  }

  function getGuestUserId() {
    return localStorage.getItem("THETA_EXAMPLE_GUEST_USER_ID")
  }

  async function fetchVaultAuthToken() {
    //TODO This is a sample endpoint to auth your user; however, you will implement your own endpoint to generate a signed JWT
    // in order to authenticate your own users' transaction (please contact us to get a testnet API Key / Secret Key & Docs)
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //FIXME: these are just for this example, you should add your own auth headers here when you integrate your own token endpoint :)
        'X-Auth-User': "usr5gv7cfqi4ezyf4m8",
        'X-Auth-Token': "wrezhw0itv6j296mnybyb3nwnebwg4ws"
    };

    const options = {
        method: 'POST',
        headers: headers
    };

    let url = "https://api.sliver.tv/v1/theta/vault/token";
    let response = await fetch(url, options);
    let responseData = await response.json();
    let body = responseData["body"];
    let accessToken = body["access_token"];

    return accessToken;
  }

  // --------- Platform Theta Wallet ------------


// --------- Launch the App --------- 

  function startVideo(theta) {
    class ClosuredThetaLoader extends Theta.HlsJsFragmentLoader {
        load(...args) {
          // Inject context from closure.
          this.thetaCtx = theta;
          super.load(...args);
        }
    }

    let hlsOpts = (theta ? { fLoader: ClosuredThetaLoader } : {});
    let videoURL = url;

    //console.log("tryna start the vid")
    
    if (Hls.isSupported()) {
        console.log("hls is supported")
        let hls = new Hls(hlsOpts);

        hls.attachMedia(player);
        
        //player.innerHTML = "<source data-src={url} type=\"application/x-mpegURL\" data-vs={url} />";
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
          console.log("media has been attached to hls")
          // load the stream
          //player.innerHTML = "<source data-src={url} type=\"application/x-mpegURL\" data-vs={url} />";
          hls.loadSource(videoURL);
        });
        
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          // Start playback
          player.play();
        });
    } else if (player.canPlayType('application/vnd.apple.mpegurl')) {
        // hls.js is not supported on platforms that do not have Media Source
        // Extensions (MSE) enabled. When the browser has built-in HLS support
        // (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL)
        // directly to the video element throught the `src` property. This is using the
        // built-in support of the plain video element, without using hls.js.
        // Note: it would be more normal to wait on the 'canplay' event below however on
        // Safari (where you are most likely to find built-in HLS support) the video.src
        // URL must be on the user-driven. White-list before a 'canplay' event will be emitted;
        // the last video event that can be reliably listened-for when the URL is not on
        // the white-list is 'loadedmetadata'.

        // We are not using HLS.js, so Theta will not be able to use P2P!
        player.src = videoURL;
    }
    else {
        // No HLS is supported...fallback...
    }
  }

  function startPlayer() {
    let userId = getGuestUserId();

    theta = new Theta({
        //TODO adjust params as needed depending on your HLS settings
        
        fragmentSize: 5000,
        failoverFactor: 0.7,
        fragmentTimeout: 3000,
        probeTimeout: 300,
        statsReportInterval: 90000,
        peerReqInterval: 120000,
        
        videoId: VIDEO_ID,
        userId: userId,

        peerServer: {
          host: PEER_SERVER_HOST,
          port: PEER_SERVER_PORT,
          secure: true
        },
        trackerServer: {
          host: TRACKER_SERVER_HOST,
          port: TRACKER_SERVER_PORT,
          secure: true,
          path: ""
        },

        debug: true
    });

    // Event handlers
    theta.addEventListener(Theta.Events.PEERS_CHANGED, function (data) {
      console.log("Connected peers changed")


      console.log("new peer connected", data)
    });
    theta.addEventListener(Theta.Events.TRAFFIC, function (data) {
    // Bandwidth was used
    // Data:
    // type : String ('cdn', 'p2p_inbound', 'p2p_outbound')
    // stats : Object
    // stats.size : Integer - Total bytes
      console.log("bandwidth being used", data, data.type, data.stats.fragmentSize)

    });
    theta.addEventListener(Theta.Events.PAYMENT_RECEIVED, function (data) {
    // Payment received
    // Data:
    // payment : Object - info about the payment
    // payment.amount : Integer - Payment amount in GammaWei
      console.log("payment received", data)
    });
    theta.addEventListener(Theta.Events.PAYMENT_SENT, function (data) {
    // Payment sent
    // Data:
    // payment : Object - info about the payment
    // payment.amount : Integer - Payment amount in GammaWei
      console.log("payment sent", data)
    });
    theta.addEventListener(Theta.Events.ACCOUNT_UPDATED, function (data) {
    // Account/waller updated
    // Data:
    // account : Object - info about the account/wallet

      console.log("account updated", data)
    });
    theta.start();
    //console.log("starting widget")
    //If you are using the Theta widget, connect the widget so it can listen to events
    theta.connectWidget();
    console.log(theta)
    startVideo(theta)
  }

  function startApp() {
    //Optional - Setup Theta Web Widgets

    console.log("euirhvienrvnjnmlkj")
    generateGuestUserIdIfNeeded();
    startPlayer();

    var widget = new ThetaWebWidgets.OverviewWithTrafficChartWidget();
    widget.setTheme(ThetaWebWidgets.Themes.Light);
    //widget.setMainMessage("Welcome to the Sample Integration. Help us test blockchain video sharing and earn TFUEL.");
    widget.render(thetaWidgetPlaceholder);
  }
  /*
  onMount(async () => {
    // NOTE: parentheses turn destructuring assignments into expressions

      // define a dependency bundle and execute code when it loads
    loadjs([
      "/static/theta/hls.js",
      "/static/theta/theta.umd.js",
      "/static/theta/theta-hls-plugin.umd.js",
      "/static/theta/videojs-theta-plugin.min.js"
    ], 'foobar');

    loadjs.ready('foobar', function() {
      startApp()
    });
  });
  */
</script>
<my-header></my-header>
<main>
  <!-- Notice we turned off controls? We're supplying our own, so we hide the native ones. -->

  


<!--
<div class="md:flex md:flex-col lg:grid lg:grid-cols-6 lg:auto-cols-auto justify-evenly">
  <div class="flex flex-col col-span-5">
    <div class="p-4">
      <vm-player class="video-js vjs-custom-skin vjs-big-play-centered vjs-16-9" controls>
    
        <vm-video bind:this={player}>
    
        </vm-video>
        <vm-hls poster="/media/poster.png" bind:this={hlsPlayer} version="0.12.4">
          <source bind:this={videoSrc} type="application/x-mpegURL" />
        </vm-hls>
      </vm-player>
    </div>
    <section id="content" class="p-4">
  
      <div bind:this={thetaWidgetPlaceholder} id="SAMPLE_THETA_WEB_WIDGET_PLACEHOLDER"></div>
    </section>
  </div>
  <div class="px-5 mx-auto col-span-1">
    <div class="grid-col-1">
    {#each videoData as video, i}
        
        <div class="h-auto w-auto p-4">
            
            <div class="mt-4">
                <a bind:this={thumbnailElement} class="block relative h-48 rounded overflow-hidden" href="/playVideo/{video.Video["id"]}" on:click={ () => currentVideoID.set(video.Video["id"])}>
                    <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="data:image/jpg;base64,{video["thumbnail"]}">
                </a>
                <h2 class="text-primary-content title-font tracking-widest mb-1 break-words"><a bind:this={titleElement} on:click={() => currentVideoID.set(video.Video["id"])} href="/playVideo/{video.Video["id"]}">{video["videoName"]}</a></h2>
                <h3 class="prose-base-content text-sm tracking-widest"><a href="_blank">{video["username"]}</a></h3>
                <p class="mt-1">{i}</p>
            </div>
        </div>
    {/each}
    </div>
</div>
-->
<div class="md:flex md:flex-col lg:grid lg:grid-cols-6 lg:auto-cols-auto justify-evenly">
  <div class="flex flex-col col-span-5">
    <div class="p-4">
      <div class="aspect-w-16 aspect-h-9">
        <video bind:this={player} on:loadedmetadata={() => player.play()} controls>
          <track kind="captions">
        </video>
      </div>
    </div>
    <section id="content" class="p-4">
      <div bind:this={thetaWidgetPlaceholder} id="SAMPLE_THETA_WEB_WIDGET_PLACEHOLDER"></div>
    </section>
  </div>
  <div class="px-5 mx-auto col-span-1">
    <div class="grid-col-1">
    {#each videoData as video, i}
        
        <div class="h-auto w-auto p-4">
            
            <div class="mt-4">
                <a bind:this={thumbnailElement} class="block relative h-48 rounded overflow-hidden" href="/playVideo/{video.Video["id"]}" on:click={ () => currentVideoID.set(video.Video["id"])}>
                    <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="data:image/jpg;base64,{video["thumbnail"]}">
                </a>
                <h2 class="text-primary-content title-font tracking-widest mb-1 break-words"><a bind:this={titleElement} on:click={() => currentVideoID.set(video.Video["id"])} href="/playVideo/{video.Video["id"]}">{video["videoName"]}</a></h2>
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
</div>
</main>
<my-footer></my-footer>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

</style>