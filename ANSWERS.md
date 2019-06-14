# Bonus Questions

## Question 4
Can you give a brief overview of the difference between the simple MP4 video playback and DASH and what is their significance from the point of view of a video viewer (ie you watching the stream) and content provider (ie Youtube) ?
What does MSE do and how does it allow DASH content to be played on browsers that do not support the media format?

### Answer
MP4 is a video format. Dash is a streaming wrapper that wraps an MP4 file to provide additional features.

For a user, DASH allows getting a stream adapted to its device capabilities and network conditions (if the stream contains multiple video tracks). 
Playing an MP4 means doing progressive download and storing the file locally in a temp file.

For the provider, DASH means having an infrastructure to package the streams. But DASH can be cheapest from a bandwidth point of view as the user fetches only the segments needed to watch the video.

Media Source Extensions (MSE) is a JavaScript API that lets you build streams for playback from segments of audio or video.

## Question 5
Can you briefly describe the player lifecycle, and more specifically the order in which player events occurred and how a P2P integration should work around these events?

### Answer
Player lifecycle
1) Load the manifest
2) Parse the manifest
3) Decide which track variant to use depending on the decoder capabilities and the current network conditions
4) Load the segments

A P2P integration should probably act 
* In the third step to override the location of the choosen segments.
* After a segment is loaded to notify others that this specific segment is available on the device.

## Question 6
Can you briefly describe the difference in network traffic between a Live stream and a VoD stream?

### Answer
Assuming the live and VoD streams are DASH streams
* For live streams, the mpd is fetched periodically whereas it is fetched only once for Vod streams. 
* Also, VoD streams trigger partial content (HTTP Code 206) vs HTTP 200 for live streams. Type is `fetch` for both live and VoD.

For mp4 progressive download, there is first a `document` call on the mp4 to read the header (response code 200) and then several Byte Range request calls of type `media` (response code 206).

## Question 7
To fully take advantage of player features to assist its video delivery, there is some advanced information we might want to get:
* Knowing which video quality the media engine is playing at a given moment and when it changes.
* Detecting and influencing the player’s video pre-buffering rate or buffer size.
* Go one step further and intercept/replace the video request to fulfill it using our Distributed Network Architecture™.

### Answer
1) To retrieve the currently active variant and its video size, one should hook the [`AdaptationEvent`](https://shaka-player-demo.appspot.com/docs/api/shaka.Player.html#.event:AdaptationEvent) using `player.addEventListener('adaptation', onEvent);` and parse `player.getVariantTracks()` to find the active track.

2) To influence the player’s video pre-buffering rate or buffer size, one should use the [`StreamingConfiguration`](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.StreamingConfiguration) and especially `bufferingGoal`, `rebufferingGoal` and `bufferBehind` attributes.<br/>
e.g. `player.configure('streaming.bufferingGoal', 60)` to set the bufferingGoal to 1 minute.

3) To intercept/replace the video requests, one should register a [`ResponseFilter`](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.ResponseFilter) on the player's NetworkEngine: [`player.getNetworkEngine().registerRequestFilter(filter)`](https://shaka-player-demo.appspot.com/docs/api/shaka.net.NetworkingEngine.html#registerRequestFilter)
