/*! @name @theta/videojs-theta-plugin @version 0.0.0 @license UNLICENSED */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).videojsThetaPlugin=e()}(this,function(){"use strict";function t(){return(t=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}function e(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function n(n,o,i){var r=i.getTech("Tech"),s=i.getTech("html5"),a={},l=function(t){function n(e){var n;return(n=t.call(this,e)||this).onAccessToken=e.onAccessToken,n}return e(n,t),n.prototype.getAuth=function(){var t=this;return new Promise(function(e,n){t.onAccessToken().then(function(t){null===t&&e({}),e({args:{access_token:t}})})})},n}(n.WalletWebSocketProvider);var u=function(t){function o(e,o){var r;return(r=t.call(this,e)||this).options=i.mergeOptions(a,o),r.currentSource=null,r.on("toggleUseCDN",function(){try{n.toggleUseCDN()}catch(t){console.log("Oops.  Could not toggle CDN")}}),r}e(o,t);var r=o.prototype;return r.dispose=function(){t.prototype.dispose.call(this),this.currentSource=null;try{this.theta_&&this.theta_.destroy()}catch(t){console.log("Exception caught while destroying Theta."),console.error(t)}},r.play=function(){this.videoElement().play()},r.pause=function(){this.videoElement().pause()},r.videoElement=function(){return this.el()},r.init=function(t){var e=this.options_,n=e.onThetaReady,o=e.onWalletAccessToken,i=e.walletUrl,r=e.videoId,s=e.userId,a=e.thetaOpts,l=this.initThetaWallet(i,o);this.theta_=this.initTheta({wallet:l,videoId:r,userId:s,thetaOpts:a}),n&&this.theta_&&n(this.theta_)},r.initTheta=function(t){var e=t.wallet,o=t.videoId,i=t.userId,r=t.thetaOpts,s={fragmentSize:5e3,failoverFactor:.7,fragmentTimeout:3e3,probeTimeout:600,statsReportInterval:9e4,peerReqInterval:12e4,peerServer:{host:"prod-theta-peerjs.thetatoken.org",port:8700,secure:!0},trackerServer:{host:"prod-testnet-grouping.thetatoken.org",port:8700,secure:!0,path:""},debug:!1};if(s.videoId=o,s.userId=i,s.wallet=e,s.allowGeoLocation=!1,r)for(var a in r)s[a]=r[a];return new n(s)},r.initThetaWallet=function(t,e){if(!t||!e)return null;var o=new l({url:t,onAccessToken:e}),i=new n.Wallet({provider:o});return i.start(),i},o.canPlaySource=function(t){return!1},o.canPlayType=function(t){return""},o.isSupported=function(){return!1},r.setSrc=function(t){},r.getTheta=function(){return this.theta_},o}(s),c=function(i){function r(t,e){return i.call(this,t)||this}e(r,i);var s=r.prototype;return s.dispose=function(){i.prototype.dispose.call(this),this.hls_&&(this.hls_.destroy(),this.hls_=null)},s.init=function(t){i.prototype.init.call(this,t),this.theta__=this.theta,this.hls_=this.initHlsjs(t,this.theta_)},s.initHlsjs=function(i,r){var s=null,a=this.videoElement(),l=this.options_,u=l.autoplay,c=l.onStreamReady,h=l.onHls,p=function(t){function n(){return t.apply(this,arguments)||this}return e(n,t),n.prototype.load=function(){var e;this.thetaCtx=r;for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];(e=t.prototype.load).call.apply(e,[this].concat(o))},n}(n.HlsJsFragmentLoader);if(o.isSupported()){var d=this.options_.hlsOpts,f=t({},r?{fLoader:p,liveBackBufferLength:30}:{},d);(s=new o(f)).attachMedia(a),h&&h(s),s.on(o.Events.MEDIA_ATTACHED,function(){s.loadSource(i),s.on(o.Events.MANIFEST_PARSED,function(t){c&&c(),void 0!==u&&this.player.autoplay(u)})})}else a.canPlayType("application/vnd.apple.mpegurl")&&(a.src=i,a.addEventListener("loadedmetadata",function(){void 0===u?a.play():this.player.autoplay(u)}));return s},r.canPlaySource=function(t){return t.type&&/^application\/(?:x-|vnd\.apple\.)mpegurl/i.test(t.type)&&o.isSupported()},r.canPlayType=function(t){return/^application\/(?:x-|vnd\.apple\.)mpegurl/i.test(t)?"probably":""},r.isSupported=function(){return o.isSupported()},s.setSource=function(t){var e=t.src;if(e===(this.currentSource?this.currentSource.src:null))console.log("Warning: the source is the same, safely ignoring...");else if(void 0===this.hls_||null===this.hls_)this.init(e),this.currentSource=t;else{this.videoElement().pause(),this.hls_&&this.hls_.destroy(),this.hls_=this.initHlsjs(e,this.theta_),this.currentSource=t}},r}(u);u.defaultState={},c.defaultState={},u.VERSION="0.0.0",c.VERSION="0.0.0",r.registerTech("theta_hlsjs",c),i.options.techOrder.push("theta_hlsjs")}return window&&window.Theta&&window.Hls&&window.videojs&&n(window.Theta,window.Hls,window.videojs),{registerPlugin:n}});