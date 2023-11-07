import { UnsignedEvent, VerifiedEvent, getSignature, serializeEvent, verifiedSymbol } from 'nostr-tools';
import { storage } from 'webextension-polyfill';
import ReNostrRelays from '../types/relays';

const NpubKey: string = 'reNostrNpub';
const NsecKey: string = 'reNostrNsec';
const RelaysKey: string = 'reNostrRelays';

async function getPublicKey(): Promise<string> {
  const keyRecord = await storage.sync.get(NpubKey);
  return keyRecord.reNostrNpub;
}

async function signEvent(event: UnsignedEvent): Promise<VerifiedEvent> {
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
}

globalThis.window.nostr.getPublicKey = getPublicKey;
globalThis.window.nostr.signEvent = signEvent;

// TODO: Insert this into active tabs.
