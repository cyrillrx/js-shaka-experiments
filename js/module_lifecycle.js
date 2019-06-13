export function bindAllEventListeners(player) {

    // Bind all events to onEvent method
    // Event list from https://shaka-player-demo.appspot.com/docs/api/shaka.Player.html#.event:AbrStatusChangedEvent

    player.addEventListener('abrstatuschanged', onEvent);
    player.addEventListener('adaptation', onEvent);
    player.addEventListener('buffering', onEventBuffering);
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

export function bindSpecificEventListeners(player, manifestUri) {

    // player.getAssetUri() is still null when the listener is called so we need to pass manifestUri
    player.addEventListener('loading', () => { console.info('[VIDEO_LOADS]', manifestUri); });
    player.addEventListener('unloading', onEventUnloaded);

    player.addEventListener('manifestparsed', onEventManifestParsed);
    player.addEventListener('error', onEventError);

    // Not demanded but helpful to apprehend the player lifecycle
    player.addEventListener('buffering', onEventBuffering);
    player.addEventListener('onstatechange', onEventStateChanged);
}

//
// Event handlers
//

function onEvent(event) {
    console.debug('[EVENT', event.type, ']', event);
}

function onEventError(event) {
  const error = event.detail
  console.error('[ERROR]', error.code, error)
}

function onEventUnloaded(event) {
  console.info('[VIDEO_UNLOADED]');
}

function onEventBuffering(event) {
  console.info('[VIDEO_BUFFERING]', event.buffering);
}

function onEventStateChanged(event) {
  console.info('[STATE]', event.state);
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