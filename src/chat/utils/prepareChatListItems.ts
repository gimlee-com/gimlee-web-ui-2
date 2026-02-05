import type { ChatListItem, ChatMessageDto } from '../types';

const itemCache: Record<string, ChatListItem> = {};

export function prepareChatListItems(messages: ChatMessageDto[]): ChatListItem[] {
  const items: ChatListItem[] = [];
  let lastDate: string | null = null;

  messages.forEach((msg) => {
    const msgDate = new Date(msg.timestamp).toDateString();
    if (msgDate !== lastDate) {
      const dividerId = `divider-${msgDate}`;
      if (!itemCache[dividerId]) {
        itemCache[dividerId] = {
          type: 'DAYS-DIVIDER',
          timestamp: msg.timestamp,
          id: dividerId,
        };
      }
      items.push(itemCache[dividerId]);
      lastDate = msgDate;
    }

    if (!itemCache[msg.id]) {
      itemCache[msg.id] = { ...msg, type: 'MESSAGE' };
    } else {
      // Update properties that might change but keep object identity if possible
      // In our case, ChatMessageDto might have 'sending' or 'error' flags changed.
      const cached = itemCache[msg.id] as ChatMessageDto & { type: 'MESSAGE' };
      if (
        cached.message !== msg.message ||
        cached.sending !== msg.sending ||
        cached.error !== msg.error ||
        cached.author.presence?.status !== msg.author.presence?.status
      ) {
        itemCache[msg.id] = { ...msg, type: 'MESSAGE' };
      }
    }
    
    items.push(itemCache[msg.id]);
  });

  return items;
}
