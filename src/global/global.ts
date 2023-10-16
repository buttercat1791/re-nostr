import NDK from '@nostr-dev-kit/ndk';
import NDKSingleton from '../singletons/ndk';

declare global {
  interface NDKService {
    ndk: NDK;

    connectRelays: () => void;
    sendEvent: (content: string, kind?: number) => Promise<boolean>;
  }

  /**
   * Global singleton wrapper for NDK.  Declared in src/singletons/ndk.ts.
   */
  var ndkService: NDKService;
}

globalThis.ndkService = NDKSingleton;
