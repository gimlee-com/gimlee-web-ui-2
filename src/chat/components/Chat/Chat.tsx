import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { List } from 'react-window';
import { AutoSizer } from 'react-virtualized-auto-sizer';
import { useTranslation } from 'react-i18next';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../../context/AuthContext';
import { prepareChatListItems } from '../../utils/prepareChatListItems';
import { measureChatItems } from '../../utils/measureChatItems';
import ChatRow from './ChatRow';
import { TypingIndicator } from '../TypingIndicator/TypingIndicator';
import { TextArea } from '../../../components/uikit/Form/Form';
import styles from './Chat.module.scss';

interface ChatProps {
  chatId: string;
  className?: string;
}

export const Chat: React.FC<ChatProps> = ({ chatId, className }) => {
  const { t } = useTranslation();
  const { username } = useAuth();
  const { 
    messages, 
    loading, 
    typingUsers, 
    sendMessage, 
    sendTyping, 
    loadMore, 
    hasMore 
  } = useChat(chatId);

  const [input, setInput] = useState('');
  const [heights, setHeights] = useState<Record<string, number>>({});
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listRef = useRef<any>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const prevMessagesCount = useRef(0);
  const prevLastMessageId = useRef<string | null>(null);

  const preparedItems = useMemo(() => prepareChatListItems(messages), [messages]);
  const lastMessageId = preparedItems.length > 0 ? preparedItems[preparedItems.length - 1].id : null;

  const [initialMeasurementFinished, setInitialMeasurementFinished] = useState(false);

  useEffect(() => {
    if (!initialMeasurementFinished && !loading && messages.length > 0 && containerWidth > 0) {
      const lastItem = preparedItems[preparedItems.length - 1];
      if (heights[lastItem?.id]) {
        setInitialMeasurementFinished(true);
      }
    }
  }, [initialMeasurementFinished, loading, messages.length, preparedItems, heights, containerWidth]);

  const showInitialLoading = loading || (!initialMeasurementFinished && messages.length > 0);

  // Auto-resize textarea
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = `${Math.min(textArea.scrollHeight, 150)}px`;
    }
  }, [input]);

  // Handle measurement of new items
  useEffect(() => {
    const unmeasuredItems = preparedItems.filter(item => !heights[item.id]);
    
    if (unmeasuredItems.length > 0 && containerWidth > 0) {
      measureChatItems(unmeasuredItems, containerWidth, username || undefined).then(newHeights => {
        setHeights(prev => ({ ...prev, ...newHeights }));
      });
    }
  }, [preparedItems, heights, containerWidth, username]);

  // Handle new messages for stick-to-bottom and unread count
  useEffect(() => {
    // We only care if messages were added to the end
    if (lastMessageId !== prevLastMessageId.current) {
      if (prevLastMessageId.current === null) {
        // Initial load or first message
        setShouldScrollToBottom(true);
      } else {
        const lastItem = preparedItems[preparedItems.length - 1];
        const isMyMessage = lastItem.type !== 'DAYS-DIVIDER' && lastItem.author.username === username;
        
        // Find how many items were added after the old last message
        const oldLastIndex = preparedItems.findIndex(item => item.id === prevLastMessageId.current);
        const appendedCount = oldLastIndex === -1 ? 1 : preparedItems.length - 1 - oldLastIndex;
        
        // Stick to bottom if already at bottom, if it's our own message, or if a scroll is already pending
        if (isAtBottom || isMyMessage || shouldScrollToBottom) {
          setShouldScrollToBottom(true);
          setUnreadCount(0);
        } else {
          // If we are here, it means messages were added at the end but we are not at bottom
          if (appendedCount > 0) {
            setUnreadCount(prev => prev + appendedCount);
          }
        }
      }
    }
    prevLastMessageId.current = lastMessageId;
    prevMessagesCount.current = preparedItems.length;
  }, [lastMessageId, preparedItems.length, username, isAtBottom, shouldScrollToBottom]);

  // Scroll to bottom when requested and heights are updated
  useEffect(() => {
    if (shouldScrollToBottom && listRef.current && preparedItems.length > 0) {
      const lastItem = preparedItems[preparedItems.length - 1];
      // We wait for the last item to be measured before scrolling to the exact bottom
      if (heights[lastItem.id]) {
        // Use a small timeout to ensure the list has processed the new heights and rendered
        const timer = setTimeout(() => {
          if (listRef.current && typeof listRef.current.scrollToRow === 'function') {
            listRef.current.scrollToRow({ index: preparedItems.length - 1, align: 'end' });
          }
          setShouldScrollToBottom(false);
        }, 50);
        return () => clearTimeout(timer);
      }
    }
  }, [preparedItems, heights, shouldScrollToBottom]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    // Check if we are near the bottom (within 50px as requested)
    const atBottom = scrollHeight - (scrollTop + clientHeight) < 50;
    setIsAtBottom(atBottom);
    if (atBottom) {
      setUnreadCount(0);
    }
  }, []);

  const getItemSize = useCallback((index: number) => {
    const item = preparedItems[index];
    return heights[item?.id] || 50;
  }, [preparedItems, heights]);

  return (
    <div className={`${styles.chatContainer} ${className || ''} uk-flex uk-flex-column`}>
      <div className="uk-flex-1 uk-position-relative">
        <AutoSizer
          onResize={({ width }) => setContainerWidth(width)}
          renderProp={({ height, width }) => {
            if (!height || !width) return null;

            if (showInitialLoading) {
              return (
                <div className="uk-position-center uk-text-center">
                  <div uk-spinner="ratio: 1.5"></div>
                  <p className="uk-text-muted uk-margin-small-top">{t('common.loading')}</p>
                </div>
              );
            }

            return (
              <List
                key={`${chatId}-${width}`}
                listRef={listRef}
                style={{ height, width }}
                rowCount={preparedItems.length}
                rowHeight={getItemSize}
                rowProps={{ items: preparedItems }}
                onRowsRendered={(visibleRows) => {
                   if (visibleRows.startIndex === 0 && hasMore && !loading) {
                     loadMore();
                   }
                   
                   // Handle unread count clearing as we scroll
                   if (unreadCount > 0) {
                     const firstUnreadIndex = preparedItems.length - unreadCount;
                     if (visibleRows.stopIndex >= firstUnreadIndex) {
                       setUnreadCount(Math.max(0, preparedItems.length - 1 - visibleRows.stopIndex));
                     }
                   }
                }}
                onScroll={handleScroll}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                rowComponent={ChatRow as any}
              />
            );
          }}
        />
        {unreadCount > 0 && (
          <div 
            className={styles.unreadNotification}
            onClick={() => {
              if (listRef.current) {
                const firstUnreadIndex = preparedItems.length - unreadCount;
                listRef.current.scrollToRow({ 
                  index: firstUnreadIndex, 
                  align: 'start',
                  behavior: 'smooth'
                });
              }
            }}
          >
            {t('chat.newMessages', { count: unreadCount })}
          </div>
        )}
      </div>

      <div className={`${styles.footer} uk-padding-small uk-padding-remove-top`}>
        <div className={styles.typingIndicatorContainer}>
          <TypingIndicator users={typingUsers} />
        </div>
        <form onSubmit={handleSend} className="uk-flex">
          <TextArea
            ref={textAreaRef}
            className="uk-margin-small-right"
            rows={1}
            placeholder={t('chat.placeholder')}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              sendTyping();
            }}
            onKeyDown={handleKeyDown}
            style={{ resize: 'none' }}
          />
          <button 
            type="submit" 
            className="uk-button uk-button-primary"
            disabled={!input.trim()}
          >
            {t('chat.send')}
          </button>
        </form>
      </div>
    </div>
  );
};
