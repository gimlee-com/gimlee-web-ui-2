import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PurchaseResponseDto, PurchaseStatus } from '../types/api';

interface PurchaseState {
  activePurchase: PurchaseResponseDto | null;
  isModalOpen: boolean;
}

const getInitialState = (): PurchaseState => {
  const stored = localStorage.getItem('activePurchase');
  if (stored) {
    try {
      const purchase = JSON.parse(stored) as PurchaseResponseDto;
      // Only restore if it's still awaiting payment
      if (purchase.status === 'AWAITING_PAYMENT') {
        return { activePurchase: purchase, isModalOpen: true };
      }
      localStorage.removeItem('activePurchase');
    } catch {
      localStorage.removeItem('activePurchase');
    }
  }
  return { activePurchase: null, isModalOpen: false };
};

export const purchaseSlice = createSlice({
  name: 'purchase',
  initialState: getInitialState(),
  reducers: {
    setActivePurchase: (state, action: PayloadAction<PurchaseResponseDto | null>) => {
      state.activePurchase = action.payload;
      state.isModalOpen = !!action.payload;
      if (action.payload && action.payload.status === 'AWAITING_PAYMENT') {
        localStorage.setItem('activePurchase', JSON.stringify(action.payload));
      } else if (!action.payload) {
        // Only clear from localStorage if we are explicitly setting to null
        // If we set a non-awaiting-payment purchase, it might be just to show the final status
        localStorage.removeItem('activePurchase');
      }
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    updateActivePurchaseStatus: (state, action: PayloadAction<PurchaseStatus>) => {
      if (state.activePurchase) {
        state.activePurchase.status = action.payload;
        if (action.payload === 'AWAITING_PAYMENT') {
          localStorage.setItem('activePurchase', JSON.stringify(state.activePurchase));
        } else {
          localStorage.removeItem('activePurchase');
        }
      }
    },
    clearActivePurchase: (state) => {
      state.activePurchase = null;
      state.isModalOpen = false;
      localStorage.removeItem('activePurchase');
    }
  },
});

export const { setActivePurchase, setModalOpen, updateActivePurchaseStatus, clearActivePurchase } = purchaseSlice.actions;
export default purchaseSlice.reducer;
