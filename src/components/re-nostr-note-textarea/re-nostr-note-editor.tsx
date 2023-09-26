import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 're-nostr-note-editor',
  styleUrl: 're-nostr-note-editor.css',
  shadow: true,
})
export class ReNostrNoteEditor {

  @Prop() placeholder?: string = 'Say something...';

  render() {
    return (
      <Host>
        <article
          id='noteInput'
          class='reNostrContentEditable'
          contentEditable={true}
        >
          {this.placeholder}
          <slot />
        </article>
      </Host>
    );
  }

}
