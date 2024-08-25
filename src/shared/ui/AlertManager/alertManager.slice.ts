import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type OAlert = {
  id: string;
  children: string;
  status: 'success' | 'error' | 'warning' | 'info';
  timeout: number;
};

export type AlertManagerState = OAlert[];

type ShowAlertPayload = {
  text: string;
  timeout: number;
  status: 'success' | 'warning' | 'error';
};

export type AlertManagerStateShape = { alerts: AlertManagerState };

const initialState: AlertManagerState = [];
export const alertManagerSlice = createSlice({
  name: 'AlertManager',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<ShowAlertPayload>) => {
      return [
        ...state,
        {
          ...action.payload,
          children: action.payload.text,
          id: crypto.randomUUID(),
          timeout: action.payload.timeout * 1000,
        },
      ];
    },
    hideAlert: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((alertData) => alertData.id !== action.payload.id);
    },
  },
});
