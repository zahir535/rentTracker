
import { createSlice } from '@reduxjs/toolkit';

export const reduxSlice = createSlice({
    name: 'tenant',
    initialState: {
        value: [],
        tenantModal: false,
        bill: [],
        totalBill: 0,
    },
    reducers: {
        addTenant: (state, action) => {
            state.value = action.payload;
        },

        openAddTenantModal: (state) => {
            state.tenantModal = true;
        },
        closeAddTenantModal: (state) => {
            state.tenantModal = false;
        },

        addBill: (state, action) => {
            state.bill = action.payload;
        },
        updateTotalBill: (state, action) => {
            state.bill = action.payload;
        },
    },
})


export const { addTenant, addBill, updateTotalBill } = reduxSlice.actions

export const selectTenant = (state) => state.tenant.value
export const selectTenantModal = (state) => state.tenant.tenantModal
export const selectBill = (state) => state.tenant.bill
export const selectTotalbill = (state) => state.tenant.totalBill

export default reduxSlice.reducer