# js-shaka-experiments
This app regroups experimentations with Shaka Player

## Experiment 1 - Player Lifecycle
Test using a VOD sample: Sintel

In this experiment, player.addEventListener() is used to handle the following lifecycle events

Main events
- 'loading'
- 'unloading'
- 'manifestparsed'
- 'error'
- 'buffering'
- 'onstatechange'

Extra events
- 'abrstatuschanged'
- 'adaptation'
- 'buffering'
- 'drmsessionupdate'
- 'emsg'
- 'error'
- 'expirationupdated'
- 'largegap'
- 'loading'
- 'manifestparsed'
- 'onstatechange'
- 'onstateidle'
- 'streaming'
- 'textchanged'
- 'texttrackvisibility'
- 'timelineregionadded'
- 'timelineregionenter'
- 'timelineregionexit'
- 'trackschanged'
- 'unloading'
- 'variantchanged'

## Experiment 2 - Network calls
Test using a live sample: Big Buck Bunny

In this experiment, networkingEngine.registerResponseFilter() is used to handle the following network events
- shaka.net.NetworkingEngine.RequestType.MANIFEST
- shaka.net.NetworkingEngine.RequestType.SEGMENT
- shaka.net.NetworkingEngine.RequestType.LICENSE
- shaka.net.NetworkingEngine.RequestType.APP
- shaka.net.NetworkingEngine.RequestType.TIMING
