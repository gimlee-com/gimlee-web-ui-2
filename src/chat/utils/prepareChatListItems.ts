import type { ChatListItem, ChatMessageDto, ChatDaysDivider } from '../types';

export function prepareChatListItems(messages: ChatMessageDto[]): ChatListItem[] {
  const items: ChatListItem[] = [];
  let lastDate: string | null = null;

  messages.forEach((msg) => {
    const msgDate = new Date(msg.timestamp).toDateString();
    if (msgDate !== lastDate) {
      const divider: ChatDaysDivider = {
        type: 'DAYS-DIVIDER',
        timestamp: msg.timestamp,
        id: `divider-${msgDate}`,
      };
      items.push(divider);
      lastDate = msgDate;
    }
    items.push({ ...msg, type: 'MESSAGE' });
  });

  return items;
}
