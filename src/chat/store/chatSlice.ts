import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { chatService } from '../services/chatService';
import type { ChatMessageDto } from '../types';

interface SingleChatState {
  messages: ChatMessageDto[];
  loading: boolean;
  error: string | null;
  typingUsers: string[];
  hasMore: boolean;
}

interface ChatState {
  chats: Record<string, SingleChatState>;
}

const initialSingleChatState: SingleChatState = {
  messages: [],
  loading: false,
  error: null,
  typingUsers: [],
  hasMore: true,
};

const initialState: ChatState = {
  chats: {},
};

export const fetchChatHistory = createAsyncThunk(
  'chat/fetchHistory',
  async ({ chatId, limit, beforeId }: { chatId: string; limit?: number; beforeId?: string }) => {
    const messages = await chatService.getHistory(chatId, limit, beforeId);
    return { chatId, messages, isInitial: !beforeId };
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ chatId, message }: { chatId: string; message: string }) => {
    return await chatService.sendMessage(chatId, { message });
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ chatId: string; message: ChatMessageDto }>) => {
      const { chatId, message } = action.payload;
      if (!state.chats[chatId]) {
        state.chats[chatId] = { ...initialSingleChatState };
      }
      // Check if message already exists to avoid duplicates from SSE + History
      if (!state.chats[chatId].messages.some(m => m.id === message.id)) {
        state.chats[chatId].messages.push(message);
        // Sort by timestamp
        state.chats[chatId].messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      }
    },
    setTyping: (state, action: PayloadAction<{ chatId: string; username: string; typing: boolean }>) => {
      const { chatId, username, typing } = action.payload;
      if (!state.chats[chatId]) {
        state.chats[chatId] = { ...initialSingleChatState };
      }
      if (typing) {
        if (!state.chats[chatId].typingUsers.includes(username)) {
          state.chats[chatId].typingUsers.push(username);
        }
      } else {
        state.chats[chatId].typingUsers = state.chats[chatId].typingUsers.filter(u => u !== username);
      }
    },
    clearChat: (state, action: PayloadAction<string>) => {
      delete state.chats[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state, action) => {
        const { chatId } = action.meta.arg;
        if (!state.chats[chatId]) {
          state.chats[chatId] = { ...initialSingleChatState };
        }
        state.chats[chatId].loading = true;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        const { chatId, messages: rawData, isInitial } = action.payload;
        
        // Handle both direct array and ArchivedMessagesResponseDto
        let messages: ChatMessageDto[] = [];
        let hasMore = false;

        if (Array.isArray(rawData)) {
          messages = rawData.map((m: any) => ({
            id: m.id,
            chatId: m.chatId,
            author: { username: m.author, userId: m.author },
            message: m.text || m.message || '',
            timestamp: m.timestamp
          }));
          hasMore = messages.length > 0;
        } else if (rawData && typeof rawData === 'object') {
          const rawMessages = (rawData as any).messages || (rawData as any).content || (rawData as any).data || [];
          messages = rawMessages.map((m: any) => ({
            id: m.id,
            chatId: m.chatId,
            author: { username: m.author, userId: m.author },
            message: m.text || m.message || '',
            timestamp: m.timestamp
          }));
          hasMore = (rawData as any).hasMore ?? (messages.length > 0);
        }

        if (isInitial) {
          state.chats[chatId].messages = messages;
        } else {
          // Prepend historical messages
          const existingIds = new Set(state.chats[chatId].messages.map(m => m.id));
          const newMessages = messages.filter((m: ChatMessageDto) => !existingIds.has(m.id));
          state.chats[chatId].messages = [...newMessages, ...state.chats[chatId].messages];
        }
        state.chats[chatId].messages.sort((a, b) => {
          const timeA = new Date(a.timestamp).getTime();
          const timeB = new Date(b.timestamp).getTime();
          return (isNaN(timeA) || isNaN(timeB)) ? 0 : timeA - timeB;
        });
        state.chats[chatId].loading = false;
        state.chats[chatId].hasMore = hasMore;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        const { chatId } = action.meta.arg;
        state.chats[chatId].loading = false;
        state.chats[chatId].error = action.error.message || 'Failed to fetch history';
      });
  },
});

export const { addMessage, setTyping, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
