import { Component, Host, Prop, State, h } from '@stencil/core';

@Component({
  tag: 're-nostr-popover-note',
  styleUrl: 're-nostr-popover-note.css',
  shadow: true,
})
export class ReNostrPopoverNote {

  private readonly noteContentLabel: string = 'Note Content';
  private readonly quotedContentLabel: string = 'Quoted Content';

  @Prop() includeQuote: boolean;

  @Prop() quotedContent?: string;

  @State() noteContent?: {
    note: string;
    quote: string;
  };

  render() {
    return (
      <Host>
        <div class="note-content">
          <label class="note-content-label">{this.noteContentLabel}</label>
          <textarea class="note-content-textarea" />
        </div>
        {this.includeQuote && <div class="quoted-content">
          <label class="quoted-content-label">{this.quotedContentLabel}</label>
          <textarea class="quoted-content-textarea" />
        </div>}
      </Host>   
    );
  }

}
