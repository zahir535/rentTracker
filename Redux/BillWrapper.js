import React, { useState, useEffect, useDebugValue } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, ScrollView } from 'react-native';

//styled
import {
    LeftView,
    HorizontalView,
    HalfNormalText,
    SmallSpaceBreak,
    InnerContainer,
    HorizontalViewEnd,
    LineNormalText,
    AddTenantButton,
    ButtonCenterText,
} from './../UiComponents/uiComponents';

//redux
import { useSelector, Provider, dispatch, useDispatch } from 'react-redux';
import {
    selectBill,
    addBill,
} from './reduxSlice';
import Store from './storeRedux';



const Bill = () => {

    const data = useSelector(selectBill)

    const dispatch = useDispatch()

    //clear tenant data
    const clearBill = () => {

        let newBillData = [];

        dispatch(addBill(newBillData))
    }

    // billNo
    // billName
    // billTotal
    // billDate
    // paidby
    // toPayState

    return (
        <View>
            <SmallSpaceBreak />

            {data.map(
                (item, i) => {
                    return (
                        <InnerContainer key={i} style={{ marginBottom: 12, }}>
                            <HorizontalViewEnd>
                                <HalfNormalText>{item.billNo})</HalfNormalText>

                                <View style={{ flexDirection: 'row', marginLeft: 12, }} >
                                    <HalfNormalText>{item.billName}</HalfNormalText>
                                </View>

                                <View style={{ flexDirection: 'row', marginLeft: 150 }} >
                                    <HalfNormalText>total: </HalfNormalText>
                                    <HalfNormalText>{item.billTotal}</HalfNormalText>
                                </View>
                            </HorizontalViewEnd>

                            <HorizontalViewEnd style={{ marginTop: 8, }} >
                                <HalfNormalText style={{ marginLeft: 24, }} >{item.billDate}</HalfNormalText>
                                <View style={{ flexDirection: 'row', marginLeft: 50 }} >
                                    <HalfNormalText>padi By: </HalfNormalText>
                                    <HalfNormalText>{item.paidby}</HalfNormalText>
                                </View>
                            </HorizontalViewEnd>

                            <HorizontalViewEnd style={{ marginTop: 8, }} >
                                <HalfNormalText style={{ marginLeft: 24, }} >toPay:  </HalfNormalText>
                                <HalfNormalText>{item.toPayState}</HalfNormalText>
                            </HorizontalViewEnd>

                            <InnerContainer style={{ justifyContent: 'center', alignItems: 'center' }} >
                                <LineNormalText>
                                    -------------------------------
                                </LineNormalText>
                            </InnerContainer>

                        </InnerContainer>
                    );
                }
            )}

            <AddTenantButton
                onPress={() => {
                    clearBill()
                }}
            >
                <ButtonCenterText>Clear all bill</ButtonCenterText>
            </AddTenantButton>
        </View>
    );
}

const BillWrapper = () => {
    return (
        <Provider store={Store}>
            <Bill />
        </Provider>
    );
}


export default BillWrapper;