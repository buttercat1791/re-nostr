import { UnsignedEvent, VerifiedEvent, getSignature, serializeEvent, verifiedSymbol } from 'nostr-tools';
import { storage } from 'webextension-polyfill';

const NpubKey: string = 'reNostrNpub';
const NsecKey: string = 'reNostrNsec';

// TODO: Insert this into active tabs.
globalThis.window.nostr = {
  async getPublicKey(): Promise<string> {
    const keyRecord = await storage.sync.get(NpubKey);
    return keyRecord.reNostrNpub;
  },

  async signEvent(event: UnsignedEvent): Promise<VerifiedEvent> {
    const keyRecord = await storage.sync.get([NpubKey, NsecKey]);

    const pubkey = keyRecord.reNostrNpub;
    const id = serializeEvent(event);
    const sig = getSignature(event, keyRecord.reNostrNsec);

    return {
      id: id,
      pubkey: pubkey,
      created_at: event.created_at,
      kind: event.kind,
      tags: event.tags,
      content: event.content,
      sig: sig,
      [verifiedSymbol]: true,
    };
  },

  // TODO: Implement getRelays().

  // NIP-04 is not currently implemented.
  nip04: {
    encrypt: function (_recipientHexPubKey: string, _value: string): Promise<string> {
      throw new Error('Function not implemented.');
    },
    decrypt: function (_senderHexPubKey: string, _value: string): Promise<string> {
      throw new Error('Function not implemented.');
    }
  },
};
