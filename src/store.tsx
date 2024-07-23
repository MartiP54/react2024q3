// store.tsx
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import astronomicalObjectsApi from './services/astronomicalObjectsApi';
import paginationReducer from './slice/paginationSlice';
import searchReducer, { SearchState } from './slice/searchSlice';

export const store = configureStore({
  reducer: {
    [astronomicalObjectsApi.reducerPath]: astronomicalObjectsApi.reducer,
    pagination: paginationReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(astronomicalObjectsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState> & { search: SearchState };
export type AppDispatch = typeof store.dispatch;
