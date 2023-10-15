import 'ionicons';
import 'webextension-polyfill';

import Browser from 'webextension-polyfill';
import NDKSingleton from './singletons/ndk';

(async () => {
  const currentTab = await Browser.tabs.getCurrent();
  const injectionResult = Browser.scripting.executeScript({
    func: () => window.nostr,
    target: { tabId: currentTab.id },
  });

  globalThis.window.nostr = injectionResult[0].result;
  globalThis.ndkService = NDKSingleton;
})();

export { Components, JSX } from './components';
