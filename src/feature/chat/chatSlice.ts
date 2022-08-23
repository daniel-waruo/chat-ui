import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MessageType} from "../../types";
import {AppThunk, RootState} from "../../store";

export interface ChatState {
  messages: MessageType[];
}

const initialState: ChatState = {
  messages: []
};

export const sendMessage = (message: MessageType): AppThunk =>
  (dispatch, getState) => {
    dispatch(addMessage(message));
  };

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageType>) => {
      state.messages = [...state.messages, action.payload];
    }
  },
});
export const selectMessages =  (state: RootState) => state.chat.messages;

export const {addMessage} = chatSlice.actions;

export default chatSlice.reducer;
