import type { UserPresenceDto } from '../../types/api';

export type ChatItemType = 'MESSAGE' | 'DAYS-DIVIDER';

export interface ChatAuthorDto {
  userId: string;
  username: string;
  displayName?: string;
  avatar?: string;
  presence?: UserPresenceDto;
}

export interface ChatMessageDto {
  id: string;
  chatId: string;
  author: ChatAuthorDto;
  message: string;
  timestamp: string; // ISO format
  lastEdited?: string;
  sending?: boolean;
  error?: boolean;
}

export interface ChatDaysDivider {
  type: 'DAYS-DIVIDER';
  timestamp: string;
  id: string; // generated
}

export type ChatListItem = (ChatMessageDto & { type?: 'MESSAGE'; shouldAnimate?: boolean }) | ChatDaysDivider;

export interface ChatState {
  messages: ChatMessageDto[];
  loading: boolean;
  error: string | null;
  typingUsers: string[]; // usernames
}

export interface NewMessageRequestDto {
  message: string;
}

export interface InternalChatEvent {
  chatId: string;
  type: 'MESSAGE' | 'TYPING_INDICATOR';
  data: string | null;
  author: string;
  timestamp: string; // ISO format
}

export type ChatEvent = InternalChatEvent[]; // Backend buffers events into an array
