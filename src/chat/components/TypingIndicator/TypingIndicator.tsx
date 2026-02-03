import React from 'react';
import { useTranslation } from 'react-i18next';

interface TypingIndicatorProps {
  users: string[];
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ users }) => {
  const { t } = useTranslation();

  if (users.length === 0) return null;

  let text = '';
  if (users.length === 1) {
    text = t('chat.typingOne', { user: users[0] });
  } else if (users.length === 2) {
    text = t('chat.typingTwo', { user1: users[0], user2: users[1] });
  } else {
    text = t('chat.typingMany');
  }

  return (
    <div className="uk-text-meta uk-margin-small-left uk-flex uk-flex-middle">
      <span uk-spinner="ratio: 0.4" className="uk-margin-small-right"></span>
      {text}
    </div>
  );
};
