
import { createSlice } from '@reduxjs/toolkit';

export const reduxSlice = createSlice({
    name: 'tenant',
    initialState: {
        tenant: [],
        bill: [],
        totalBill: 0,
        toPayState: [],
    },
    reducers: {
        addTenant: (state, action) => {
            state.tenant = action.payload;
        },
        updateTenant: (state, action) => {
            state.tenant = action.payload;
        },

        addBill: (state, action) => {
            state.bill = action.payload;
        },
        updateTotalBill: (state, action) => {
            state.totalBill = action.payload;
        },

        updateToPayState: (state, action) => {
            state.toPayState = action.payload;
        },

    },
})


export const {

    addTenant,
    updateTenant,
    addBill,
    updateTotalBill,
    updateToPayState,

} = reduxSlice.actions

export const selectTenant = (state) => state.tenant.tenant
export const selectBill = (state) => state.tenant.bill
export const selectTotalbill = (state) => state.tenant.totalBill
export const selectToPayState = (state) => state.tenant.toPayState

export default reduxSlice.reducer