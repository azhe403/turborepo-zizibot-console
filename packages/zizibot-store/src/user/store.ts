import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@zizibot/store/user/state';

export const appStore = configureStore({
  reducer: {
    user: userSlice
  }
});

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch
export type AppStore = typeof appStore
