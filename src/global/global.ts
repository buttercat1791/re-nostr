import NostrConnectSingleton from '../singletons/nostr-connect';

declare global {
  interface INostrConnect {
    sendEvent: (content: string, kind?: number) => Promise<boolean>;
  }

  /**
   * Global singleton wrapper for NDK.  Declared in src/singletons/ndk.ts.
   */
  var nostrConnect: INostrConnect;
}

globalThis.nostrConnect = NostrConnectSingleton;
