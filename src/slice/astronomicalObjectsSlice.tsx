
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AstronomicalObject } from '../services/astronomicalObjectsApi';

export interface AstronomicalObjectsState {
  data: AstronomicalObject[] | null;
}

const initialState: AstronomicalObjectsState = {
  data: null,
};

const astronomicalObjectsSlice = createSlice({
  name: 'astronomicalObjects',
  initialState,
  reducers: {
    setAstronomicalObjects(state, action: PayloadAction<AstronomicalObject[]>) {
      state.data = action.payload;
    },
    clearAstronomicalObjects(state) {
      state.data = null;
    }
  },
});

export const { setAstronomicalObjects, clearAstronomicalObjects } = astronomicalObjectsSlice.actions;
export default astronomicalObjectsSlice.reducer;
