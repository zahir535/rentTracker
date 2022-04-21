import { configureStore } from '@reduxjs/toolkit';
import tenantReducer from './../ArrayRed/arraySlice';

export default configureStore({
  reducer: {
    tenant: tenantReducer,
  },
});