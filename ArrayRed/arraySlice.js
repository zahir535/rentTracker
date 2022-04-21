
import { createSlice } from '@reduxjs/toolkit';

export const arraySlice = createSlice({
    name: 'tenant',
    initialState: {
        value: [{
            name: 'defaultTenant',
            toPay: 0,
            payAdv: 0,
        }],
    },
    reducers: {
        addTenant: (state, action) => {
            //console.log("slice: "+action.payload); 
            //{/**NOT RUNNING -NO CONSOLE LOG WHEN INVOKED. OR IS IT INVOKED OR NOT? */}
            state.value = action.payload;
            
        },
    },
})


export const { addTenant } = arraySlice.actions

export const selectTenant = (state) => state.tenant.value

export default arraySlice.reducer