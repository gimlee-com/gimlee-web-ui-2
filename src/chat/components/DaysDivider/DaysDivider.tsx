import React from 'react';
import { useTranslation } from 'react-i18next';
import { isToday, isYesterday } from 'date-fns';

interface DaysDividerProps {
  date: string;
  style?: React.CSSProperties;
}

export const DaysDivider: React.FC<DaysDividerProps> = ({ date, style }) => {
  const { t, i18n } = useTranslation();
  const d = new Date(date);

  let label;
  if (isToday(d)) {
    label = t('chat.today');
  } else if (isYesterday(d)) {
    label = t('chat.yesterday');
  } else {
    label = d.toLocaleDateString(i18n.language, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div style={style}>
      <div className="uk-text-center uk-padding-small">
        <span className="uk-label uk-label-info">{label}</span>
      </div>
    </div>
  );
};
