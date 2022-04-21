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
import { useSelector, Provider, useDispatch } from 'react-redux';
import {
    selectTenant,
    selectBill,
    updateTotalBill,
    selectTotalbill,
} from './reduxSlice';
import Store from './storeRedux';



const Summary = () => {

    //get tenant data
    const data = useSelector(selectTenant)
    //get bill data
    const billData = useSelector(selectBill)

    //get totalbilldata
    const totalBillRedux = useSelector(selectTotalbill)

    //dispatch
    const dispatch = useDispatch()


    // //calculate total bill
    const calcTotal = () => {

        //init sumOfAll val
        let sumOfAll = 0;

        //iterate billData array
        billData.forEach(element => {
            sumOfAll += element.billTotal;
        });

        dispatch(updateTotalBill(sumOfAll))

    }

    //useeffect
    useEffect(() => {
        calcTotal()
    }, [billData]);


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

            <HorizontalViewEnd style={{ marginTop: 24, }} >
                <HalfNormalText>Total bill: {totalBillRedux}</HalfNormalText>
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