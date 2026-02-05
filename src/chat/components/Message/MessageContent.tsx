import React from 'react';
import { Markdown } from '../../../components/Markdown/Markdown';

interface MessageContentProps {
  message: string;
}

export const MessageContent: React.FC<MessageContentProps> = React.memo(({ message }) => {
  return (
    <div className="chat-message-content">
      <Markdown content={message} />
    </div>
  );
});
