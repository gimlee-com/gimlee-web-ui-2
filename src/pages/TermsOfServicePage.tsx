import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useNavbarMode } from '../hooks/useNavbarMode';
import NavbarPortal from '../components/Navbar/NavbarPortal';
import { Heading } from '../components/uikit/Heading/Heading';
import { Markdown } from '../components/Markdown/Markdown';
import styles from './TermsOfServicePage.module.scss';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 40 }
  }
} as const;

const TermsOfServicePage: React.FC = () => {
  const { t } = useTranslation();

  useNavbarMode('focused', '/');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <NavbarPortal>
        <Heading as="h5" className="uk-margin-remove uk-text-truncate">
          {t('terms.title')}
        </Heading>
      </NavbarPortal>

      <motion.article variants={itemVariants} className={`uk-article ${styles.article}`}>
        <h1 className="uk-article-title">{t('terms.title')}</h1>
        <p className="uk-article-meta">{t('terms.lastUpdated')}</p>
        <Markdown content={t('terms.content')} />
      </motion.article>
    </motion.div>
  );
};

export default TermsOfServicePage;
