import NDK, { NDKEvent, NDKNip07Signer } from '@nostr-dev-kit/ndk';

const relays = [];
const nip07Signer = new NDKNip07Signer();

const NDKSingleton = {
  ndk: new NDK({
    explicitRelayUrls: relays,
    signer: nip07Signer,
  }),
  connectRelays: () => {
    ndkService.ndk.connect();
  },
  sendEvent: async (content: string, kind: number = 1) => {
    const ndkEvent = new NDKEvent(ndkService.ndk);
  
    ndkEvent.content = content;
    ndkEvent.kind = kind;
  
    await ndkEvent.publish();
  
    return true;
  },
};

export default NDKSingleton;
