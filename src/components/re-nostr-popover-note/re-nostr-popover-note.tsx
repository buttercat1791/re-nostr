import { Component, Host, Listen, Prop, State, h } from '@stencil/core';

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

  @Listen('click')
  onClick(event: MouseEvent) {
    // TODO: Send with NDK
  }

  render() {
    return (
      <Host>
        <div class="noteContent">
          <label>{this.noteContentLabel}</label>
          <textarea class="reNostrInput" />
        </div>
        {this.includeQuote && this.renderQuotedContent()}
        <button class="reNostrButton">Send</button>
      </Host>   
    );
  }

  private renderQuotedContent() {
    return (
      <div class="quotedContent">
        <label>{this.quotedContentLabel}</label>
        <textarea class="reNostrInput" />
      </div>
    )
  }

}
