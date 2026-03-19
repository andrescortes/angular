import { ChatType } from "../type/chat.type";

export const initialChatState: ChatType = {
  chats: [],
  connected: false,
  currentUser: 'User_' + Math.floor(Math.random() * 100)
}
