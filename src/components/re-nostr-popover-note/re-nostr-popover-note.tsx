import { Component, Host, Listen, Prop, State, h } from '@stencil/core';

@Component({
  tag: 're-nostr-popover-note',
  styleUrl: 're-nostr-popover-note.css',
  shadow: true,
})
export class ReNostrPopoverNote {

  private readonly sendButtonId: string = 'sendButton';
  private readonly sendButtonText: string = 'Send';

  @Prop() quotedContent?: string;

  /**
   * The content of the note in Markdown format.
   */
  @State() noteContent?: string;

  @Listen('updateNote')
  onUpdateNote(event: CustomEvent<string>) {
    this.noteContent = event.detail;
  }

  @Listen('click', { capture: true, target: 'body' })
  onClick(event: any) {
    try {
      if (event.originalTarget.id === this.sendButtonId) {
        globalThis.ndkService.sendEvent(this.noteContent);
      }

      event.originalTarget.blur();
    } catch (error) {
      // Clicks outside the send button will throw an error indicating the app
      // is not allowed to access target.id.  This doesn't impact the app's
      // performance, so we reduce the log level to avoid log clutter.
      console.warn(error);
    }
  }

  render() {
    return (
      <Host>
        <re-nostr-note-editor initialContent={this.quotedContent}/>
        <button id={this.sendButtonId} class='reNostrButton'>
          <span>{this.sendButtonText}</span>
          <ion-icon name="send-sharp" />
        </button>
      </Host>   
    );
  }

}
