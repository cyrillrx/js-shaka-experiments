export function bindNetworkCalls(player) {

    const networkingEngine = player.getNetworkingEngine();
  
    const responseFilter = (responseType, response) => {
  
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
          console.error('[UNKNOWN_TYPE_DETECTED]', responseType, response);
      }
    };
  
    networkingEngine.registerResponseFilter(responseFilter);
  }