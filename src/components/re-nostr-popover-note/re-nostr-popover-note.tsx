import { Component, Host, Listen, Prop, State, h } from '@stencil/core';

@Component({
  tag: 're-nostr-popover-note',
  styleUrl: 're-nostr-popover-note.css',
  shadow: true,
})
export class ReNostrPopoverNote {

  private readonly sendButtonId: string = 'sendButton';

  @Prop() includeQuote: boolean;

  @Prop() quotedContent?: string;

  /**
   * The content of the note in Markdown format.
   */
  @State() noteContent?: string;

  @Listen('updateNote')
  onUpdateNote(event: CustomEvent<string>) {
    this.noteContent = event.detail;
  }

  @Listen('click')
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.id === this.sendButtonId) {
      console.log(this.noteContent);
    }

    ndkService.sendEvent(this.noteContent);
  }

  render() {
    return (
      <Host>
        <re-nostr-note-editor initialContent={this.quotedContent}/>
        <button id={this.sendButtonId} class='reNostrButton'>
          Send
          <i class="fa-regular fa-paper-plane"></i>
        </button>
      </Host>   
    );
  }

}
