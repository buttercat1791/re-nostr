import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 're-nostr-popover-root',
  styleUrl: 're-nostr-popover-root.css',
  shadow: true,
})
export class ReNostrPopoverRoot {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
