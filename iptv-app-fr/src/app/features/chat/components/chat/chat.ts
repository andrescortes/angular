import { Component, effect, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ChatStore } from '../../../../store/chat/ChatStore.store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit {
  readonly store = inject(ChatStore);
  @ViewChild('scrollContainer') 
  private scrollContainer!: ElementRef;

  newMessage = '';
  constructor() {
    effect(() => {
      if (this.store.chats().length) {
        setTimeout(() => this.scrollToBottom(), 50);
      }
    });
  }

  ngOnInit() {
    this.store.loadHistory();
    this.store.connect();
  }

  send(): void {
    if (this.newMessage.trim()) {
      this.store.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log('err :>> ', err);
    }
  }
}
