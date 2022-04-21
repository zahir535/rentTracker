import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput } from 'react-native';

//redux
import { useSelector, useDispatch, Provider } from 'react-redux';
import {
    addTenant,
    selectTenant,
} from './arraySlice';

import Store from './../ArrayRed/storeArray';


const ArrayRed = () => {

    const [localTenant, setLocalTenant] = useState([]);
    const dispatch = useDispatch();

    const data = useSelector(selectTenant)

    //new obj to be inputted into array
    let newObj = {
        name: 'tenant 1',
        toPay: 345,
        payAdv: 978,
    }

    return (
        <View>
            <Text>ArrayRed ! </Text>

            <View style={{marginVertical: 18,}} >
                <Text>{data.map(
                    (item, i) => {
                        return(
                            <View key={i}>
                                <Text>Name:  {item.name} </Text>
                                <Text>toPay: {item.toPay}    payAdv: {item.payAdv}</Text>
                            </View>
                        );
                    }
                )}</Text>
            </View>

            <TouchableOpacity
                style={{ padding: 8, borderWidth: 1, marginTop: 12, }}
                onPress={() => {
                    let newArray = [...data, newObj];
                    addTenant(newArray)
                    console.log(data)
                }}
            >
                <Text>Add tenant</Text>
            </TouchableOpacity>
        </View>
    );
}

const ArrayRedWrapper = () => {
    return (
        <Provider store={Store}>
            <ArrayRed />
        </Provider>
    );
}


export default ArrayRedWrapper;