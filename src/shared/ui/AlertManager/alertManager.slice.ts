import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type AlertStatus = 'success'|'error'|'warning'|'info';

export type OAlert = {
  id: string;
  children: string;
  status: AlertStatus;
  timeout: number;
};

export type AlertManagerState = OAlert[];

type ShowAlertPayload = {
  id: string;
  text: string;
  timeout: number;
  status: AlertStatus;
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
        },
      ];
    },
    hideAlert: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((alertData) => alertData.id !== action.payload.id);
    },
  },
});
