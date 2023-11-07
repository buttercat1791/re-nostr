import NDK, { NDKEvent, NDKNip07Signer } from '@nostr-dev-kit/ndk';
import { storage } from 'webextension-polyfill';
import ReNostrRelays from '../types/relays';

class NostrConnect implements INostrConnect {
  private static readonly relaysKey = 'reNostrRelays';

  private ndk: NDK;
  private nip07Signer: NDKNip07Signer;
  private relayUrls: string[];
  private relaysUpdated: boolean = false;

  constructor() {
    this.nip07Signer = new NDKNip07Signer();

    NostrConnect.getRelays()
      .then(relays => {
        this.relayUrls = Object.keys(relays);
        this.ndk = new NDK({
          explicitRelayUrls: this.relayUrls,
          signer: this.nip07Signer,
        });

        this.ndk.connect();
      });
  }

  async sendEvent(content: string, kind: number = 1) {
    if (this.relaysUpdated) {
      this.ndk.explicitRelayUrls = this.relayUrls;
      await this.ndk.connect();
      this.relaysUpdated = false;
    }

    const ndkEvent = new NDKEvent(this.ndk);
    ndkEvent.content = content;
    ndkEvent.kind = kind;
    await ndkEvent.publish();

    return true;
  }

  static async getRelays(): Promise<ReNostrRelays> {
    const relayRecord = await storage.local.get(this.relaysKey);
    
    return relayRecord[this.relaysKey] as ReNostrRelays;
  }
  
  async addRelay(url: string, read = false, write = false): Promise<void> {
    const relayRecord = await NostrConnect.getRelays();
    relayRecord[url] = { read, write };

    await storage.local.set({ [NostrConnect.relaysKey]: relayRecord });

    this.relayUrls = Object.keys(relayRecord);
    this.relaysUpdated = true;
  }
  
  async updateRelay(url: string, read = false, write = false): Promise<void> {
    const relayRecord = await NostrConnect.getRelays();
    relayRecord[url] = { read, write };
    await storage.local.set({ [NostrConnect.relaysKey]: relayRecord });
  }
  
  async removeRelay(url: string): Promise<void> {
    const relayRecord = await NostrConnect.getRelays();
    delete relayRecord[url];

    await storage.local.set({ [NostrConnect.relaysKey]: relayRecord });

    this.relayUrls = Object.keys(relayRecord);
    this.relaysUpdated = true;
  }
}

const NostrConnectService = new NostrConnect();
export default NostrConnectService;
