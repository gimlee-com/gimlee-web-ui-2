import React, { memo } from 'react';
import { Message } from '../Message/Message';
import { DaysDivider } from '../DaysDivider/DaysDivider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChatRow: React.FC<any> = (props) => {
  const { items, index, style } = props;
  const chatItem = items[index];

  if (!chatItem) return null;

  if (chatItem.type === 'DAYS-DIVIDER') {
    return (
      <DaysDivider 
        date={chatItem.timestamp} 
        style={style} 
      />
    );
  }

  return (
    <Message
      style={style}
      measuredHeight={typeof style.height === 'number' ? style.height : 0}
      {...chatItem}
    />
  );
};

export default memo(ChatRow);
