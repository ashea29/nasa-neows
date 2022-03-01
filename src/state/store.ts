import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import logger from './middleware/logger';

 
const store = process.env.NODE_ENV === 'production' ? 
configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: true,
    serializableCheck: {
      ignoredPaths: ['auth', 'auth.error']
    },
  }),
  devTools: false,
})
: 
configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: true,
    serializableCheck: {
      ignoredPaths: ['auth', 'auth.error']
    },
  }).concat(logger),
  devTools: true,
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export default store