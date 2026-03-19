import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { initialChatState } from "./state/chat.state";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { inject } from "@angular/core";
import { ChatService } from "../../features/chat/services/chat.service";
import { pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { IChat } from "../../core/interfaces/chat.interface";

export const ChatStore = signalStore(
  { providedIn: 'root' },
  withState(initialChatState),
  withMethods((store, chatService = inject(ChatService)) => {
    let socket: WebSocket;
    return {
      loadHistory: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { chats: [], connected: false })),
          switchMap(() => chatService.getHistory()
            .pipe(
              tapResponse({
                next: (chats) => patchState(store, { chats }),
                error: () => patchState(store, { chats: [], connected: false, currentUser: '' })
              })
            )
          )
        )
      ),

      connect(): void {
        socket = new WebSocket('ws://localhost:9000/chat-socket');
        socket.onopen = () => patchState(store, { connected: true });
        socket.onclose = () => patchState(store, { connected: false });

        socket.onmessage = (event: MessageEvent<any>) => {
          const chat: IChat = JSON.parse(event.data);

          const chats = structuredClone(store.chats());
          chats.push(chat);
          patchState(store, { chats: [...chats] })
        }
      },

      sendMessage(msg: string): void {
        const chat: IChat = {
          id: '',
          message: msg,
          createdAt: '',
          sender: store.currentUser()
        };
        socket.send(JSON.stringify(chat));
      }
    }
  })
)
