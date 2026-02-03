import React, { type ReactNode } from 'react';
import classNames from 'classnames';
import styles from './MessageCard.module.scss';

interface MessageCardProps {
  children: ReactNode;
  own?: boolean;
  className?: string;
}

export const MessageCard: React.FC<MessageCardProps> = ({ children, own, className }) => {
  return (
    <div
      className={classNames(
        styles.card,
        own ? styles.own : styles.other,
        'uk-card uk-card-default',
        className
      )}
    >
      {children}
    </div>
  );
};
