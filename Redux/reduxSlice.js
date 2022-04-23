
import { createSlice } from '@reduxjs/toolkit';

export const reduxSlice = createSlice({
    name: 'tenant',
    initialState: {
        tenant: [],
        //tenantModal: false,
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

        updateToPayState: (state, action) => {
            state.toPayState = action.payload;
        },
    },
})


export const {

    addTenant,
    addBill,
    updateTotalBill,
    updateToPayState,
    updateTenant,

} = reduxSlice.actions

export const selectTenant = (state) => state.tenant.tenant
//export const selectTenantModal = (state) => state.tenant.tenantModal
export const selectBill = (state) => state.tenant.bill
export const selectTotalbill = (state) => state.tenant.totalBill
export const selectToPayState = (state) => state.tenant.toPayState

export default reduxSlice.reducer