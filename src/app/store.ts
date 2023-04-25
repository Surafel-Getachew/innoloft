import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { productsApi } from '../features/api/productSliceQuery';
import { trlApi } from '../features/api/trlSliceQuery';
import { appConfigApi } from '../features/api/appConfigSliceQuery';
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [trlApi.reducerPath]: trlApi.reducer,
    [appConfigApi.reducerPath]: appConfigApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      trlApi.middleware,
      appConfigApi.middleware
    ),
  devTools: process.env.NODE_ENV === 'development',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
