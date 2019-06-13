// 
// Global variables
//

const manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

//
// Main functions
//

function initApp() {

  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer();
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!');
  }
}

function initPlayer() {
  // Create a Player instance.
  var video = document.getElementById('video');
  var player = new shaka.Player(video);

  // Attach player to the window to make it easy to access in the JS console.
  window.player = player;

  // listenToAllEvents(player);
  // listenToSpecificEvents(player);
  bindNetworkCalls(player);

  // Load the stream
  player
    .load(manifestUri)
    .then(onPlayerLoaded)
    .catch(onPlayerError);
}

// Binds all events to onEvent method
// Event list from https://shaka-player-demo.appspot.com/docs/api/shaka.Player.html#.event:AbrStatusChangedEvent
function listenToAllEvents(player) {

  player.addEventListener('abrstatuschanged', onEvent);
  player.addEventListener('adaptation', onEvent);
  player.addEventListener('buffering', onEvent);
  player.addEventListener('drmsessionupdate', onEvent);
  player.addEventListener('emsg', onEvent);
  player.addEventListener('error', onEvent);
  player.addEventListener('expirationupdated', onEvent);
  player.addEventListener('largegap', onEvent);
  player.addEventListener('loading', onEvent);
  player.addEventListener('manifestparsed', onEvent);
  player.addEventListener('onstatechange', onEvent);
  player.addEventListener('onstateidle', onEvent);
  player.addEventListener('streaming', onEvent);
  player.addEventListener('textchanged', onEvent);
  player.addEventListener('texttrackvisibility', onEvent);
  player.addEventListener('timelineregionadded', onEvent);
  player.addEventListener('timelineregionenter', onEvent);
  player.addEventListener('timelineregionexit', onEvent);
  player.addEventListener('trackschanged', onEvent);
  player.addEventListener('unloading', onEvent);
  player.addEventListener('variantchanged', onEvent);
}

function listenToSpecificEvents(player) {

  player.addEventListener('loading', onEventLoads);
  player.addEventListener('manifestparsed', onEventManifestParsed);
  player.addEventListener('error', onEventError);
  player.addEventListener('unloading', onEventUnloaded);

  // Not demanded but helpful to apprehend the player lifecycle
  player.addEventListener('buffering', onEventBuffering);
  player.addEventListener('onstatechange', onEventStateChanged);
}

function onPlayerLoaded() {
  console.debug('[LOADED]')
}

// Handles shaka.util.Error
function onPlayerError(error) {
  console.error('[ERROR', error.code, ']', error)
}

//
// Event handlers
//

function onEvent(event) {
  console.debug('[EVENT', event.type, ']', event);
}

function onEventLoads(event) {
  console.info('[VIDEO_LOADS]', manifestUri);
}

function onEventUnloaded(event) {
  console.info('[VIDEO_UNLOADED]');
}

function onEventStateChanged(event) {
  console.info('[STATE]', event.state);
}

function onEventBuffering(event) {
  console.info('[VIDEO_BUFFERING]', event.buffering);
}

function onEventError(event) {
  onError(event.detail);
}

function onEventManifestParsed(event) {

  var player = event.target
  var manifest = player.getManifest()

  // Retrieve all the variants from the manifest
  var variants = manifest.periods[0].variants

  // Split audio and video tracks
  var audioTracks = [];
  var videoTracks = [];

  // Split audio and video tracks
  variants.forEach(function (variant) {

    var audioTrack = variant.audio
    if (!audioTracks.includes(audioTrack)) {
      audioTracks.push(audioTrack)
    }

    var videoTrack = variant.video
    if (!videoTracks.includes(videoTrack)) {
      videoTracks.push(videoTrack)

      // Log only video track details
      var videoSize = 'size: ' + videoTrack.width + 'x' + videoTrack.height
      var videoBandwidth = 'bandwidth: ' + videoTrack.bandwidth

      console.info('[MEDIA_VARIANT]', videoSize, videoBandwidth)
    }
  })

  console.info('[METADATA_PARSED]', 'variants: ' + variants.length, 'audio: ' + audioTracks.length, 'video: ' + videoTracks.length);

  if (player.isLive()) {
    console.info('[STREAM_TYPE] live');
  } else {
    console.info('[STREAM_TYPE] VoD');
  }
}

function bindNetworkCalls(player) {

  const networkingEngine = player.getNetworkingEngine();

  const responseFilter = (responseType, request) => {

    switch (responseType) {
      case shaka.net.NetworkingEngine.RequestType.MANIFEST:
        console.info('[MANIFEST_DETECTED]');
        break;
      case shaka.net.NetworkingEngine.RequestType.SEGMENT:
        console.info('[SEGMENT_DETECTED]');
        break;
      case shaka.net.NetworkingEngine.RequestType.LICENSE:
        console.info('[LICENSE_DETECTED]');
        break;
      case shaka.net.NetworkingEngine.RequestType.APP:
        console.info('[APP_DETECTED]');
        break;
      case shaka.net.NetworkingEngine.RequestType.TIMING:
        console.info('[TIMING_DETECTED]');
        break;
      default:
        console.error('[UNKNOWN_TYPE_DETECTED]', responseType, request);
    }
  };

  networkingEngine.registerResponseFilter(responseFilter);
}

//
// App start
//

document.addEventListener('DOMContentLoaded', initApp);