
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AstronomicalObject } from '../services/astronomicalObjectsApi';

export interface SelectedObjectsState {
  selectedObjects: AstronomicalObject[];
}

const initialState: SelectedObjectsState = {
  selectedObjects: [],
};

const selectedObjectsSlice = createSlice({
  name: 'selectedObjects',
  initialState,
  reducers: {
    addSelectedObject(state, action: PayloadAction<AstronomicalObject>) {
      state.selectedObjects.push(action.payload);
    },
    removeSelectedObject(state, action: PayloadAction<string>) {
      state.selectedObjects = state.selectedObjects.filter(
        (obj) => obj.uid !== action.payload
      );
    },
    clearSelectedObjects(state) {
      state.selectedObjects = [];
    },
  },
});

export const { addSelectedObject, removeSelectedObject, clearSelectedObjects } = selectedObjectsSlice.actions;
export default selectedObjectsSlice.reducer;
