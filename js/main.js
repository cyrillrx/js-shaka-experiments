// 
// Global variables
//

var manifestUri =
  'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

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

  bindEventListeners(player);

  // Load the stream
  player
    .load(manifestUri)
    .then(onPlayerLoaded)
    .catch(onPlayerError);
}

function bindEventListeners(player) {

  // Bind all events to onEvent method
  // Event list from https://shaka-player-demo.appspot.com/docs/api/shaka.Player.html#.event:AbrStatusChangedEvent

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

  // TODO bind events specifically
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

//
// App start
//

document.addEventListener('DOMContentLoaded', initApp);