import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Prop,
  State,
  h
} from '@stencil/core';

@Component({
  tag: 're-nostr-note-editor',
  styleUrl: 're-nostr-note-editor.css',
  shadow: true,
})
export class ReNostrNoteEditor {

  @Element() el: HTMLElement;

  /**
   * Placeholder text to show before the user starts typing.
   */
  @Prop() placeholder?: string = 'Say something...';

  /**
   * Any content that should populate the note editor before the user starts typing.
   */
  @Prop() initialContent?: string;

  /**
   * Emits the content of the note when it is updated.
   */
  @Event() updateNote: EventEmitter<string>;

  /**
   * Stores the content of the note.
   */
  @State() noteContent?: string;

  private textarea?: HTMLTextAreaElement;

  @Listen('input', { capture: true })
  onInput() {
    this.noteContent = this.textarea.value;
    this.updateNote.emit(this.noteContent);
  }

  componentWillLoad() {
    this.noteContent = `\n\n> ${this.initialContent}\n`;
  }

  componentDidLoad() {
    this.textarea = this.el.shadowRoot.querySelector('#noteEditorInput');
    this.updateNote.emit(this.noteContent);
  }

  render() {
    return (
      <Host>
        <textarea
          id='noteEditorInput'
          class='reNostrInput'
          placeholder={this.placeholder}
          value={this.noteContent}
        />
      </Host>
    );
  }

}
