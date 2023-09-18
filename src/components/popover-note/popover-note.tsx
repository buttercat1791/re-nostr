import { TextareaCustomEvent } from '@ionic/core';
import { Component, Fragment, Listen, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'popover-note',
  styleUrl: 'popover-note.css',
  shadow: true,
})
export class PopoverNote {

  private readonly noteContentLabel: string = 'Note Content';
  private readonly quotedContentLabel: string = 'Quoted Content';

  @Prop() includeQuote: boolean;

  @Prop() quotedContent?: string;

  @State() noteContent: {
    note: string;
    quote: string;
  };

  @Listen('ionChange')
  ionChangeHandler(event: TextareaCustomEvent) {
    switch (event.target.label) {
      case this.noteContentLabel:
        this.noteContent.note = event.detail.value;
        break;

      case this.quotedContentLabel:
        this.noteContent.quote = event.detail.value;
        break;
    
      default:
        break;
    }
  }

  render() {
    return (
      <Fragment>
        <ion-header>
          <ion-title>Create Note</ion-title>
        </ion-header>
        <ion-content>
          {this.includeQuote
            ? this.renderNoteWithQuote()
            : this.renderNote()}
          <ion-button expand='block'>Send Note</ion-button>
        </ion-content>
      </Fragment>
    );
  }

  private renderNote() {
    return (
      <ion-list>
        <ion-item>
          <ion-textarea label={this.noteContentLabel} placeholder='Say anything'/>
        </ion-item>
      </ion-list>
    );
  }

  private renderNoteWithQuote() {
    return (
      <ion-list>
        <ion-item>
          <ion-textarea label={this.noteContentLabel} placeholder='Say anything'/>
        </ion-item>
        <ion-item>
          <ion-textarea label={this.quotedContentLabel} value={this.quotedContent} readonly={true}/>
        </ion-item>
      </ion-list>
    );
  }

}
