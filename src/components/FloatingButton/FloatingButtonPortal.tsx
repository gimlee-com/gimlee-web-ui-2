import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

export const FLOATING_BUTTON_CONTAINER_ID = 'floating-button-container';

interface FloatingButtonPortalProps {
  children: React.ReactNode;
}

export const FloatingButtonPortal: React.FC<FloatingButtonPortalProps> = ({ children }) => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const checkElement = () => {
      const el = document.getElementById(FLOATING_BUTTON_CONTAINER_ID);
      if (el) {
        setTargetElement(el);
        return true;
      }
      return false;
    };

    if (checkElement()) return;

    const observer = new MutationObserver(() => {
      if (checkElement()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  if (!targetElement) return null;

  return createPortal(
    <AnimatePresence mode="popLayout">
      {children ? (
        <motion.div
          key="floating-button-content"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ 
            type: 'spring',
            stiffness: 400,
            damping: 40
          }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>,
    targetElement
  );
};

export default FloatingButtonPortal;
