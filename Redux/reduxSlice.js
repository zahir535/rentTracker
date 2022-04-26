
import { createSlice } from '@reduxjs/toolkit';

export const reduxSlice = createSlice({
    name: 'tenant',
    initialState: {
        tenant: [],
        bill: [],
        totalBill: 0,
        toPayState: [],
        monthly: [],
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

        addMonthly: (state, action) => {
            state.monthly = action.payload;
        },

    },
})


export const {

    addTenant,
    updateTenant,
    addBill,
    updateTotalBill,
    updateToPayState,
    addMonthly,

} = reduxSlice.actions

export const selectTenant = (state) => state.tenant.tenant
export const selectBill = (state) => state.tenant.bill
export const selectTotalbill = (state) => state.tenant.totalBill
export const selectToPayState = (state) => state.tenant.toPayState
export const selectMonthly = (state) => state.tenant.monthly

export default reduxSlice.reducer