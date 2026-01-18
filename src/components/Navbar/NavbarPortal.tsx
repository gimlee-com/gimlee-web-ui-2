import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAppSelector } from '../../store';

export const NAVBAR_PORTAL_ID = 'navbar-focused-content';

interface NavbarPortalProps {
  children: React.ReactNode;
}

const NavbarPortal: React.FC<NavbarPortalProps> = ({ children }) => {
  const mode = useAppSelector((state) => state.navbar.mode);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (mode !== 'focused') {
      setTargetElement(null);
      return;
    }

    const checkElement = () => {
      const el = document.getElementById(NAVBAR_PORTAL_ID);
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
  }, [mode]);

  if (mode !== 'focused' || !targetElement) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.2,
          delay: 0.0 // Wait for navbar resize and mode transition
        }}
        style={{ minWidth: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>,
    targetElement
  );
};

export default NavbarPortal;
