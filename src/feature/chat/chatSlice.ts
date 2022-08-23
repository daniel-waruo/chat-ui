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
    // add to localstorage
    localStorage.setItem('messages', JSON.stringify(getState().chat.messages))
  };

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageType>) => {
      state.messages = [...state.messages, action.payload];
    },
    setMessages: (state, action: PayloadAction<MessageType[]>) => {
      state.messages = action.payload;
    }
  },
});
export const selectMessages = (state: RootState) => state.chat.messages;

export const {addMessage,setMessages} = chatSlice.actions;

export default chatSlice.reducer;
