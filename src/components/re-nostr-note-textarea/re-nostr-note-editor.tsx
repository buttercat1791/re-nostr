import { Component, Host, Prop, State, h } from '@stencil/core';

@Component({
  tag: 're-nostr-note-editor',
  styleUrl: 're-nostr-note-editor.css',
  shadow: true,
})
export class ReNostrNoteEditor {

  private readonly noteInputId: string = 'noteInput';

  @Prop() placeholder?: string = 'Say something...';

  @State() noteContent?: string;

  onFocus(event: FocusEvent) {
    const eventTarget = event.target as HTMLElement;
  }

  onInput(event: InputEvent) {
    const eventTarget = event.target as HTMLElement;
    this.noteContent = eventTarget.textContent;
  }

  componentWillLoad() {
    this.noteContent = this.placeholder;
  }

  render() {
    return (
      <Host>
        <article
          id={this.noteInputId}
          class='reNostrContentEditable'
          contentEditable={true}
          onFocus={this.onFocus}
          onInput={this.onInput}
        >
          {this.noteContent}
          <slot />
        </article>
      </Host>
    );
  }

}
