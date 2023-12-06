import { configureStore } from "@reduxjs/toolkit";
import storesSlice from './storesSlice';

export const store = configureStore({
  reducer:{
    storesStore:storesSlice
  }
});
