import React, { useState, useEffect, useDebugValue } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, ScrollView, ToastAndroid } from 'react-native';

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
    SquareButton,
} from './../UiComponents/uiComponents';

//redux
import { useSelector, Provider, dispatch, useDispatch } from 'react-redux';
import {
    selectBill,
    addBill,
} from './reduxSlice';
import Store from './storeRedux';

//async
import AsyncStorage from '@react-native-async-storage/async-storage';

//icon 
import { MaterialIcons } from '@expo/vector-icons';

const Bill = () => {

    const data = useSelector(selectBill)

    const dispatch = useDispatch()

    //clear bill data
    const clearBill = () => {

        let newBillData = [];

        dispatch(addBill(newBillData))
        saveToAsyncBill(newBillData)
    }

    //fx save to async
    const saveToAsyncBill = async (newBillData) => {
        try {
            await AsyncStorage.setItem('@MyBill', JSON.stringify(newBillData));
        } catch (err) {
            ToastAndroid.show(err,
                ToastAndroid.SHORT);
        }
    };

    //delete specific bill
    const deleteOneBill = (i) => {
        let filteredBill = [];

        data.forEach((element, j) => {
            if (j != i) {
                filteredBill.push(element);
            }
        });

        dispatch(addBill(filteredBill))
        saveToAsyncBill(filteredBill)

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

            {
                data.map(

                    (item, i) => {
                        if (data.length > 0) {
                            return (
                                <InnerContainer key={i} style={{ marginBottom: 12, }}>
                                    <HorizontalViewEnd>
                                        <HalfNormalText>{item.billNo})</HalfNormalText>

                                        <View style={{ flexDirection: 'row', marginLeft: 12, }} >
                                            <HalfNormalText>{item.billName}</HalfNormalText>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginLeft: 70, }} >
                                            <HalfNormalText>total: </HalfNormalText>
                                            <HalfNormalText >{item.billTotal.toString().slice(0, 6)}</HalfNormalText>
                                        </View>

                                        <SquareButton
                                            onPress={() => {
                                                deleteOneBill(i)
                                            }}
                                        >
                                            <MaterialIcons name="delete" size={24} color="grey" style={{ opacity: .6, }} />
                                        </SquareButton>
                                    </HorizontalViewEnd>

                                    <HorizontalViewEnd style={{ marginTop: 8, }} >
                                        <HalfNormalText style={{ marginLeft: 24, }} >{item.billDate}</HalfNormalText>
                                        <View style={{ flexDirection: 'row', marginLeft: 50 }} >
                                            <HalfNormalText>paid By: </HalfNormalText>
                                            <HalfNormalText>{item.paidby}</HalfNormalText>
                                        </View>
                                    </HorizontalViewEnd>

                                    <HorizontalViewEnd style={{ marginTop: 8, flexWrap: 'wrap' }} >
                                        <HalfNormalText style={{ marginLeft: 24, }} >toPay:  </HalfNormalText>
                                        <HalfNormalText>{item.toPayState.toString().slice(0, 35)}</HalfNormalText>
                                    </HorizontalViewEnd>

                                    <InnerContainer style={{ justifyContent: 'center', alignItems: 'center' }} >
                                        <LineNormalText>
                                            -------------------------------
                                        </LineNormalText>
                                    </InnerContainer>

                                </InnerContainer>
                            );
                        } else {
                            return (
                                <View>
                                    <Text>No data !</Text>
                                </View>
                            );
                        }
                    }

                    // (item, i) => {
                    //     return (
                    //         <InnerContainer key={i} style={{ marginBottom: 12, }}>
                    //             <HorizontalViewEnd>
                    //                 <HalfNormalText>{item.billNo})</HalfNormalText>

                    //                 <View style={{ flexDirection: 'row', marginLeft: 12, }} >
                    //                     <HalfNormalText>{item.billName}</HalfNormalText>
                    //                 </View>

                    //                 <View style={{ flexDirection: 'row', marginLeft: 70, }} >
                    //                     <HalfNormalText>total: </HalfNormalText>
                    //                     <HalfNormalText >{item.billTotal.toString().slice(0, 6)}</HalfNormalText>
                    //                 </View>

                    //                 <SquareButton
                    //                     onPress={() => {
                    //                         deleteOneBill(i)
                    //                     }}
                    //                 >
                    //                     <MaterialIcons name="delete" size={24} color="grey" style={{ opacity: .6, }} />
                    //                 </SquareButton>
                    //             </HorizontalViewEnd>

                    //             <HorizontalViewEnd style={{ marginTop: 8, }} >
                    //                 <HalfNormalText style={{ marginLeft: 24, }} >{item.billDate}</HalfNormalText>
                    //                 <View style={{ flexDirection: 'row', marginLeft: 50 }} >
                    //                     <HalfNormalText>paid By: </HalfNormalText>
                    //                     <HalfNormalText>{item.paidby}</HalfNormalText>
                    //                 </View>
                    //             </HorizontalViewEnd>

                    //             <HorizontalViewEnd style={{ marginTop: 8, flexWrap: 'wrap' }} >
                    //                 <HalfNormalText style={{ marginLeft: 24, }} >toPay:  </HalfNormalText>
                    //                 <HalfNormalText>{item.toPayState.toString().slice(0, 35)}</HalfNormalText>
                    //             </HorizontalViewEnd>

                    //             <InnerContainer style={{ justifyContent: 'center', alignItems: 'center' }} >
                    //                 <LineNormalText>
                    //                     -------------------------------
                    //                 </LineNormalText>
                    //             </InnerContainer>

                    //         </InnerContainer>
                    //     );
                    // }
                )
            }

            {/* CLEAR ALL BILL BUTTON */}
            {/* <AddTenantButton
                onPress={() => {
                    clearBill()
                }}
            >
                <ButtonCenterText>Clear all bill</ButtonCenterText>
            </AddTenantButton> */}
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