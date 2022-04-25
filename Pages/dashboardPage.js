import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

//import UI
import {
    StyledContainer,
    InnerContainer,
    InnerShadowBox,
    OuterShadowBox,
    PageTitle,
    StrongText,
    HorizontalViewTop,
    ModalButton,
    ModalView,
    ScrollList,
    SpaceBreak,
    AddTenantButton,
    ButtonCenterText,
} from './../UiComponents/uiComponents';

//addtenant modal
import AddTenantWrapper from "../Modals/addTenant";
//addbill modal
import AddBillWrapper from "../Modals/addBill";

//async
import AsyncStorage from '@react-native-async-storage/async-storage';

//icon
import { Ionicons, Entypo } from '@expo/vector-icons';

//redux
import { useSelector, useDispatch, Provider } from 'react-redux';
import {
    addTenant,
    selectTenant,
    addBill,
    selectBill,
    updateTotalBill,
    selectTotalbill,
} from './../Redux/reduxSlice';
import Store from './../Redux/storeRedux';


//show data dashboard
import SummaryWrapper from '../Redux/SummaryWrapper';
import BillWrapper from "../Redux/BillWrapper";

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../UiComponents/KeyboardAvoidingWrapper";


//initiate val from async
const Init = () => {
    // dispatch(addBill(newArray))
    // dispatch(updateTenant(combinedTenantCalc))

    //redux dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        loadBill()
        loadTenant()
    }, []);

    //Mybill JSON async
    const loadBill = async () => {
        try {
            let jsonvalue = await AsyncStorage.getItem('@MyBill');

            if (jsonvalue !== null) {
                //save to redux
                //E.G = setBill(JSON.parse(jsonvalue));
                let val = JSON.parse(jsonvalue);
                dispatch(addBill(val))
            }

        } catch (err) {
            alert(err);
        }
    }

    //MyTenant JSON async
    const loadTenant = async () => {
        try {
            let jsonvalue = await AsyncStorage.getItem('@MyTenant');

            if (jsonvalue !== null) {
                //save to redux
                //E.G = setBill(JSON.parse(jsonvalue));
                let val = JSON.parse(jsonvalue);
                dispatch(updateTenant(val))
            }

        } catch (err) {
            alert(err);
        }
    }

    return null;
}

//wrapper to enable the use of redux
const InitWrapper = () => {
    return (
        <Provider store={Store}>
            <Init />
        </Provider>
    );
}


const Dashboard = () => {

    //modal state using usestate
    const [addTenantModal, setAddTenantModal] = useState(false);
    const closeAddTenantModal = () => {
        setAddTenantModal(false);
    }
    const [addBillModal, setAddBillModal] = useState(false);
    const closeAddBillModal = () => {
        setAddBillModal(false);
    }

    useEffect(() => {
        InitWrapper()
    }, [])


    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>

                {/* MODAL CODE TO ADD NEW TENANT*/}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={addTenantModal}
                    onRequestClose={() => {
                        //Alert.alert("Modal has been closed.");
                        setAddTenantModal(!addTenantModal);
                    }}
                >
                    <ModalView>
                        <AddTenantWrapper
                            closeAddTenantModal={closeAddTenantModal}
                        />
                    </ModalView>


                </Modal>


                {/* MODAL CODE TO ADD NEW BILL*/}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={addBillModal}
                    onRequestClose={() => {
                        //Alert.alert("Modal has been closed.");
                        setAddBillModal(!addBillModal);
                    }}
                >
                    <ModalView>
                        <AddBillWrapper
                            closeAddBillModal={closeAddBillModal}
                        />
                    </ModalView>


                </Modal>


                <HorizontalViewTop>
                    <PageTitle>Dashboard</PageTitle>

                    <HorizontalViewTop>
                        <ModalButton
                            onPress={() => {
                                // console.log("Add tenant modal invoked!")
                                setAddTenantModal(true)
                            }}
                        >
                            <Ionicons name="person-add" size={24} color="black" />
                        </ModalButton>

                        <ModalButton
                            onPress={() => {
                                setAddBillModal(true)
                            }}
                        >
                            <Entypo name="add-to-list" size={24} color="black" />
                        </ModalButton>
                    </HorizontalViewTop>
                </HorizontalViewTop>

                <ScrollList>
                    <OuterShadowBox>
                        <InnerShadowBox>
                            <StrongText>Summary: </StrongText>
                            {/* SUMMARY OF TENANT NAME & DETAILS */}
                            <SummaryWrapper />
                        </InnerShadowBox>
                    </OuterShadowBox>

                    <ScrollList>
                        <OuterShadowBox>
                            <InnerShadowBox>
                                <StrongText>Bills:</StrongText>
                                {/* SUMMARY OF BILL DETAILS */}
                                <BillWrapper />
                            </InnerShadowBox>
                        </OuterShadowBox>
                        <SpaceBreak />
                    </ScrollList>
                </ScrollList>


            </InnerContainer>
        </StyledContainer>
    );
}





export default Dashboard;