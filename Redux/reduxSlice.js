
import { createSlice } from '@reduxjs/toolkit';

export const reduxSlice = createSlice({
    name: 'tenant',
    initialState: {
        tenant: [],
        tenantToPayIndicator: [],
        tenantPayAdvIndicator: [],
        //tenantModal: false,
        bill: [],
        totalBill: 0,
    },
    reducers: {
        addTenant: (state, action) => {
            state.tenant = action.payload;
        },

        // openAddTenantModal: (state) => {
        //     state.tenantModal = true;
        // },
        // closeAddTenantModal: (state) => {
        //     state.tenantModal = false;
        // },

        addBill: (state, action) => {
            state.bill = action.payload;
        },
        updateTotalBill: (state, action) => {
            state.totalBill = action.payload;
        },
        updateToPayindicator: (state, action) => {
            state.tenantToPayIndicator = action.payload;
        },
        updatePayAdvIndicator: (state, action) => {
            state.tenantPayAdvIndicator = action.payload;
        },
    },
})


export const {
    addTenant,
    addBill,
    updateTotalBill,
    updateToPayindicator,
    updatePayAdvIndicator
} = reduxSlice.actions

export const selectTenant = (state) => state.tenant.tenant
export const selectTenantModal = (state) => state.tenant.tenantModal
export const selectBill = (state) => state.tenant.bill
export const selectTotalbill = (state) => state.tenant.totalBill
export const selectToPayIndicator = (state) => state.tenant.tenantToPayIndicator
export const selectpayAdvIndicator = (state) => state.tenant.tenantPayAdvIndicator

export default reduxSlice.reducer