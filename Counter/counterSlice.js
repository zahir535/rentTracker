
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByFive: (state) => {
            state.value += 5;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})


export const { increment, decrement, incrementByFive, incrementByAmount } = counterSlice.actions

export const selectCount = (state) => state.counter.value

export default counterSlice.reducer