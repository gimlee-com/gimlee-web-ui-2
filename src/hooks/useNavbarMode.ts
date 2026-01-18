import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { setMode, resetMode } from '../store/navbarSlice';
import type { NavbarMode } from '../store/navbarSlice';

export const useNavbarMode = (mode: NavbarMode, fallbackBackLink?: string) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const backLink = location.state?.from || fallbackBackLink;
    dispatch(setMode({ mode, backLink }));
    return () => {
      dispatch(resetMode());
    };
  }, [mode, fallbackBackLink, dispatch, location.state]);
};
