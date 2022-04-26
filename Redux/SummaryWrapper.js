import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, ScrollView, ToastAndroid } from 'react-native';

//styled
import {
    LeftView,
    HorizontalView,
    HalfNormalText,
    SmallSpaceBreak,
    HorizontalViewEnd,
    NormalText,
    StrongText,
    ButtonCenterText,
    AddTenantButton,
} from './../UiComponents/uiComponents';

//redux
import { useSelector, Provider, useDispatch } from 'react-redux';
import {
    selectTenant,
    selectBill,
    updateTotalBill,
    selectTotalbill,
    selectToPayState,
    updateTenant
} from './reduxSlice';
import Store from './storeRedux';

//async
import AsyncStorage from '@react-native-async-storage/async-storage';

const Summary = () => {

    //get tenant data
    const data = useSelector(selectTenant)
    //get bill data
    const billData = useSelector(selectBill)
    //get totalbilldata
    const totalBillRedux = useSelector(selectTotalbill)

    //dispatch
    const dispatch = useDispatch()


    //calculate total bill
    const calcTotal = () => {

        //init sumOfAll val
        let sumOfAll = 0;

        //iterate billData array
        billData.forEach(element => {
            sumOfAll += element.billTotal;
        });

        dispatch(updateTotalBill(sumOfAll))

    }

    //clear tenant data
    const clearTenant = () => {

        let newTenantData = [];


        data.forEach(item => {

            let obj = {};

            //clear all toPay & payAdv = 0
            obj.id = item.id;
            obj.name = item.name;
            obj.toPay = 0;
            obj.payAdv = 0;

            newTenantData.push(obj);
        });




        dispatch(updateTenant(newTenantData))
        saveToAsyncTenant(newTenantData)
    }

    //fx save to async
    const saveToAsyncTenant = async (newTenantData) => {
        try {
            await AsyncStorage.setItem('@MyTenant', JSON.stringify(newTenantData));
        } catch (err) {
            ToastAndroid.show(err,
                ToastAndroid.SHORT);
        }
    };



    //useeffect
    useEffect(() => {
        calcTotal()
    }, [billData, data]);


    return (
        <View>
            <SmallSpaceBreak />

            <HorizontalView>
                <LeftView>
                    <HalfNormalText>Name</HalfNormalText>
                </LeftView>

                <LeftView>
                    <HalfNormalText>toPay</HalfNormalText>
                </LeftView>

                <LeftView>
                    <HalfNormalText>payAdv</HalfNormalText>
                </LeftView>
            </HorizontalView>

            <SmallSpaceBreak />

            {data.map(
                (item, i) => {

                    return (
                        <HorizontalView key={i} >
                            <LeftView>
                                <NormalText>{item.name}</NormalText>
                            </LeftView>

                            <LeftView>
                                <NormalText>{item.toPay.toString().slice(0, 6)}</NormalText>
                            </LeftView>

                            <LeftView>
                                <NormalText>{item.payAdv.toString().slice(0, 6)}</NormalText>
                            </LeftView>
                        </HorizontalView>
                    );
                }
            )}

            <HorizontalViewEnd style={{ marginTop: 24, }} >
                <StrongText>Total bill: {totalBillRedux.toString().slice(0, 6)}</StrongText>
            </HorizontalViewEnd>

            <AddTenantButton
                onPress={() => {
                    clearTenant()
                }}
            >
                <ButtonCenterText>Clear tenant data</ButtonCenterText>
            </AddTenantButton>

        </View>
    );
}

const SummaryWrapper = () => {
    return (
        <Provider store={Store}>
            <Summary />
        </Provider>
    );
}


export default SummaryWrapper;