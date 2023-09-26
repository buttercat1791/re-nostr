import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 're-nostr-popover-root',
  styleUrl: 're-nostr-popover-root.css',
  shadow: true,
})
export class ReNostrPopoverRoot {

  // TODO: Remove this after testing
  private readonly loremIpsumText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ante vel velit bibendum bibendum.';

  render() {
    return (
      <Host>
        <re-nostr-popover-note
          includeQuote={true}
          quotedContent={this.loremIpsumText}
        />
      </Host>
    );
  }

}
