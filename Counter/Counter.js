import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput } from 'react-native';

//redux
import { useSelector, useDispatch, Provider } from 'react-redux';
import {
    increment,
    decrement,
    selectCount,
    incrementByFive,
    incrementByAmount,
} from './counterSlice';

import Store from './../Counter/store';

const Counter = () => {

    const [incrementAmount, setIncrementAmount] = useState(8);

    const count = useSelector(selectCount);
    const dispatch = useDispatch();

    return (
        <View>
            <Text>Count: {count}</Text>

            <TextInput 
                placeholder='amount'
                style={{borderWidth: 1, marginVertical: 12, padding: 8,}}
                onChangeText={(val) => {
                    setIncrementAmount(parseInt(val))
                }}
                keyboardType = 'numeric'
            />

            <TouchableOpacity
                style={{padding: 8, borderWidth: 1, marginTop: 12,}}
                onPress={() => dispatch(increment())}
            >
                <Text>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{padding: 8, borderWidth: 1, marginTop: 12,}}
                onPress={() => dispatch(decrement())}
            >
                <Text>-</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{padding: 8, borderWidth: 1, marginTop: 12,}}
                onPress={() => dispatch(incrementByFive())}
            >
                <Text>Increment by 5</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{padding: 8, borderWidth: 1, marginTop: 12,}}
                onPress={() => dispatch(incrementByAmount(incrementAmount || 0))}
            >
                <Text>Increment by input val</Text>
            </TouchableOpacity>
        </View>
    );
}

const CounterWrapper = () => {
    return (
        <Provider store={Store}>
            <Counter />
        </Provider>
    );
}


export default CounterWrapper;