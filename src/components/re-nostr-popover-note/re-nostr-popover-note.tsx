import { Component, Host, Listen, Prop, State, h } from '@stencil/core';

@Component({
  tag: 're-nostr-popover-note',
  styleUrl: 're-nostr-popover-note.css',
  shadow: true,
})
export class ReNostrPopoverNote {

  private readonly quotedContentId: string = 'quotedContent';
  private readonly sendButtonId: string = 'sendButton';

  @Prop() includeQuote: boolean;

  @Prop() quotedContent?: string;

  @State() noteContent?: {
    note: string;
    quote: string;
  };

  @Listen('click')
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.id === this.sendButtonId) {

    }
  }

  render() {
    return (
      <Host>
        <re-nostr-note-editor>
          {this.includeQuote && this.renderQuotedContent()}
        </re-nostr-note-editor>
        <button id={this.sendButtonId} class='reNostrButton'>Send</button>
      </Host>   
    );
  }

  private renderQuotedContent() {
    return (
      <blockquote
        id={this.quotedContentId}
        class='reNostrBlockquote'
        contentEditable={false}
      >
        {this.quotedContent}
      </blockquote>
    )
  }

}
