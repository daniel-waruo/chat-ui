import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {chatSlice} from "../feature/chat/chatSlice";


export const store = configureStore({
  reducer: {
    chat:chatSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store
