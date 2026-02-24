import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PurchaseResponseDto, PurchaseStatus } from '../types/api';

export interface PurchaseState {
  activePurchase: PurchaseResponseDto | null;
  isModalOpen: boolean;
  currentUser: string | null;
}

const getStorageKey = (username: string) => `activePurchase:${username}`;

const initialState: PurchaseState = {
  activePurchase: null,
  isModalOpen: false,
  currentUser: null,
};

export const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    rehydrateForUser: (state, action: PayloadAction<string>) => {
      const username = action.payload;
      state.currentUser = username;
      const stored = localStorage.getItem(getStorageKey(username));
      if (stored) {
        try {
          const purchase = JSON.parse(stored) as PurchaseResponseDto;
          if (purchase.status === 'AWAITING_PAYMENT') {
            state.activePurchase = purchase;
            state.isModalOpen = true;
            return;
          }
          localStorage.removeItem(getStorageKey(username));
        } catch {
          localStorage.removeItem(getStorageKey(username));
        }
      }
    },
    clearForLogout: (state) => {
      state.activePurchase = null;
      state.isModalOpen = false;
      state.currentUser = null;
    },
    setActivePurchase: (state, action: PayloadAction<PurchaseResponseDto | null>) => {
      state.activePurchase = action.payload;
      state.isModalOpen = !!action.payload;
      if (action.payload && action.payload.status === 'AWAITING_PAYMENT' && state.currentUser) {
        localStorage.setItem(getStorageKey(state.currentUser), JSON.stringify(action.payload));
      } else if (!action.payload && state.currentUser) {
        localStorage.removeItem(getStorageKey(state.currentUser));
      }
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    updateActivePurchaseStatus: (state, action: PayloadAction<PurchaseStatus>) => {
      if (state.activePurchase) {
        state.activePurchase.status = action.payload;
        if (action.payload === 'AWAITING_PAYMENT' && state.currentUser) {
          localStorage.setItem(getStorageKey(state.currentUser), JSON.stringify(state.activePurchase));
        } else if (state.currentUser) {
          localStorage.removeItem(getStorageKey(state.currentUser));
        }
      }
    },
    clearActivePurchase: (state) => {
      state.activePurchase = null;
      state.isModalOpen = false;
      if (state.currentUser) {
        localStorage.removeItem(getStorageKey(state.currentUser));
      }
    }
  },
});

export const { rehydrateForUser, clearForLogout, setActivePurchase, setModalOpen, updateActivePurchaseStatus, clearActivePurchase } = purchaseSlice.actions;
export default purchaseSlice.reducer;
