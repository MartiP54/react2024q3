import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AstronomicalObject } from '../services/astronomicalObjectsApi';

export interface SelectedObjectState {
  selectedObject: AstronomicalObject | null;
}

const initialState: SelectedObjectState = {
  selectedObject: null,
};

const selectedObjectSlice = createSlice({
  name: 'selectedObject',
  initialState,
  reducers: {
    setSelectedObject(state, action: PayloadAction<AstronomicalObject>) {
      state.selectedObject = action.payload;
    },
    clearSelectedObject(state) {
      state.selectedObject = null;
    },
  },
});

export const { setSelectedObject, clearSelectedObject } = selectedObjectSlice.actions;
export default selectedObjectSlice.reducer;
