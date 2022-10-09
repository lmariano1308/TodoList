import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../Slices/todoSlice';

export const armazenar = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
