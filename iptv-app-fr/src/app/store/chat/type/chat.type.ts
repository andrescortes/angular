import { IChat } from "../../../core/interfaces/chat.interface"

export type ChatType = {
  chats: IChat[];
  connected: boolean;
  currentUser: string;
}
