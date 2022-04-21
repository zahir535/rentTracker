import React, { useState, useEffect } from 'react';
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
} from './../UiComponents/uiComponents';

//redux
import { useSelector, Provider } from 'react-redux';
import {
    selectBill,
} from './reduxSlice';
import Store from './storeRedux';



const Bill = () => {

    const data = useSelector(selectBill)

    // billNo
    // billName
    // billTotal
    // billDate
    // paidby

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

                                <View style={{ flexDirection: 'row', marginLeft: 150}} >
                                    <HalfNormalText>total: </HalfNormalText>
                                    <HalfNormalText>{item.billTotal}</HalfNormalText>
                                </View>
                            </HorizontalViewEnd>



                            <HorizontalViewEnd style={{marginTop: 8,}} >
                                <HalfNormalText style={{marginLeft: 24,}} >{item.billDate}</HalfNormalText>
                                <View style={{ flexDirection: 'row', marginLeft: 50}} >
                                    <HalfNormalText>padi By: </HalfNormalText>
                                    <HalfNormalText>{item.paidby}</HalfNormalText>
                                </View>
                            </HorizontalViewEnd>

                            <InnerContainer style={{justifyContent: 'center', alignItems: 'center'}} >
                                <LineNormalText>
                                    -------------------------------
                                </LineNormalText>
                            </InnerContainer>

                        </InnerContainer>
                    );
                }
            )}
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