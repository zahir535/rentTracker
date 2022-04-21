import { configureStore } from '@reduxjs/toolkit';
import tenantReducer from './reduxSlice';

export default configureStore({
  reducer: {
    tenant: tenantReducer,
  },
});