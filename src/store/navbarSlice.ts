import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type NavbarMode = 'default' | 'focused';

interface NavbarState {
  mode: NavbarMode;
  backLink?: string;
}

const initialState: NavbarState = {
  mode: 'default',
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<{ mode: NavbarMode; backLink?: string }>) => {
      state.mode = action.payload.mode;
      state.backLink = action.payload.backLink;
    },
    resetMode: (state) => {
      state.mode = 'default';
      state.backLink = undefined;
    },
  },
});

export const { setMode, resetMode } = navbarSlice.actions;
export default navbarSlice.reducer;
