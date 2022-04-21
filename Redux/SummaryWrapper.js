import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, ScrollView } from 'react-native';

//styled
import {
    LeftView,
    HorizontalView,
    HalfNormalText,
    SmallSpaceBreak,
    HorizontalViewEnd,
} from './../UiComponents/uiComponents';

//redux
import { useSelector, Provider } from 'react-redux';
import {
    selectTenant,
    selectBill,
    updateTotalBill,
} from './reduxSlice';
import Store from './storeRedux';
import { parseInterpolation } from 'react-native/Libraries/LogBox/Data/parseLogBoxLog';



const Summary = () => {

    //get tenant data
    const data = useSelector(selectTenant)
    //get bill data
    // const billData = useSelector(selectBill)
    

    // //calculate total bill
    // const calcTotal = () => {

    //     const bill = billData.slice();
    //     const totalBill = 0;

    //     //iterate billData array
    //     bill.map(
    //         (item) => {
    //             totalBill += parseInt(item.totalBill);
    //             console.log(item.totalBill)
    //         }
    //     );

    //     return totalBill;
    // }

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

            

            {data.map(
                (item, i) => {
                    return (
                        <HorizontalView key={i} >
                            <LeftView>
                                <HalfNormalText>{item.name}</HalfNormalText>
                            </LeftView>

                            <LeftView>
                                <HalfNormalText>{item.toPay}</HalfNormalText>
                            </LeftView>

                            <LeftView>
                                <HalfNormalText>{item.payAdv}</HalfNormalText>
                            </LeftView>
                        </HorizontalView>
                    );
                }
            )}

                <HorizontalViewEnd style={{marginTop: 24,}} >
                    <HalfNormalText>Total bill: </HalfNormalText>
                </HorizontalViewEnd>
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