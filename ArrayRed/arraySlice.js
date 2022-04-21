
import { createSlice } from '@reduxjs/toolkit';

export const arraySlice = createSlice({
    name: 'tenant',
    initialState: {
        value: [
            {
                name: "defaultTenant",
                toPay: 0,
                payAdv: 0,
            },
        ],
    },
    reducers: {
        addTenant: (state, action) => {
            state.value = action.payload;
        },
    },
})


export const { addTenant, openAddTenantModal, closeAddTenantModal } = arraySlice.actions

export const selectTenant = (state) => state.tenant.value

export default arraySlice.reducer