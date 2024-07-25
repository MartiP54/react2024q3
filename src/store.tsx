import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import astronomicalObjectsApi from './services/astronomicalObjectsApi';
import paginationReducer from './slice/paginationSlice';
import searchReducer from './slice/searchSlice';
import astronomicalObjectsReducer from './slice/astronomicalObjectsSlice';
import selectedObjectsReducer from './slice/selectedObjectsSlice';
import selectedObjectReducer from './slice/selectedObjectSlice';

export const store = configureStore({
  reducer: {
    [astronomicalObjectsApi.reducerPath]: astronomicalObjectsApi.reducer,
    pagination: paginationReducer,
    search: searchReducer,
    astronomicalObjects: astronomicalObjectsReducer,
    selectedObjects: selectedObjectsReducer,
    selectedObject: selectedObjectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(astronomicalObjectsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
