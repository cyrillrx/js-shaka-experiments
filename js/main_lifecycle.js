import * as lifecycle from './module_lifecycle.js';

// 
// Global variables
//

const bigBuckBunnyLive = 'https://wowzaec2demo.streamlock.net/live/bigbuckbunny/manifest_mpm4sav_mvtime.mpd';
const sintel = 'https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd';
const angelOne = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

var manifestUri = sintel;

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

  lifecycle.bindSpecificEventListeners(player, manifestUri);

  // Load the stream
  player
    .load(manifestUri)
    .then(onPlayerLoaded)
    .catch(onPlayerError);
}

function onPlayerLoaded() {
  console.debug('[VIDEO_LOADED]')
}

// Handles shaka.util.Error
function onPlayerError(error) {
  console.error('[ERROR', error.code, ']', error)
}

//
// App start
//

document.addEventListener('DOMContentLoaded', initApp);