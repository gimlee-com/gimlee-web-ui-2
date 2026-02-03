import React from 'react';
import classNames from 'classnames';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import type { ChatMessageDto } from '../../types';
import { MessageCard } from './MessageCard';
import { MessageContent } from './MessageContent';
import { AvatarWithPresence } from '../../../components/AvatarWithPresence';
import styles from './Message.module.scss';

interface MessageProps extends ChatMessageDto {
  style?: React.CSSProperties;
  measuredHeight?: number;
}

export const Message: React.FC<MessageProps> = ({ 
  author, 
  message, 
  timestamp, 
  style,
  sending,
  error
}) => {
  const { username } = useAuth();
  const authorUsername = author?.username || 'unknown';
  const isOwn = username === authorUsername;

  const formattedTime = new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div 
      style={style} 
      className={classNames(
        styles.messageContainer,
        isOwn ? styles.own : styles.other
      )}
    >
      <div className={classNames(
        'uk-flex uk-flex-bottom uk-padding-small uk-padding-remove-top',
        isOwn ? 'uk-flex-right' : 'uk-flex-left'
      )}>
        {!isOwn && (
          <div className={classNames(styles.avatar, 'uk-margin-small-right')}>
            <Link to={`/u/${authorUsername}`} className="uk-display-block">
              <AvatarWithPresence 
                username={authorUsername} 
                avatarUrl={author.avatar} 
                status={author.presence?.status}
                size={32} 
                badgeSize={8}
              />
            </Link>
          </div>
        )}
        
        <motion.div 
          className={styles.contentWrapper}
          initial={{ opacity: 0, x: isOwn ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {!isOwn && <div className={styles.authorName}>{author?.displayName || authorUsername}</div>}
          <MessageCard own={isOwn}>
            <MessageContent message={message} />
            <div className={classNames(styles.meta, isOwn ? 'uk-text-right' : 'uk-text-left')}>
              <span className={styles.timestamp}>{formattedTime}</span>
              {sending && <span uk-spinner="ratio: 0.4" className="uk-margin-small-left"></span>}
              {error && <span className="uk-text-danger uk-margin-small-left">!</span>}
            </div>
          </MessageCard>
        </motion.div>

        {isOwn && (
          <div className={classNames(styles.avatar, 'uk-margin-small-left')}>
            <Link to={`/u/${authorUsername}`} className="uk-display-block">
              <AvatarWithPresence 
                username={authorUsername} 
                avatarUrl={author.avatar} 
                status={author.presence?.status}
                size={32} 
                badgeSize={8}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
