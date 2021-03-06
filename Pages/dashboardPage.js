import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity, ToastAndroid } from 'react-native';
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

    //condition if data is populated or not - 26/4 still not used
    const [dataPopulated, setDataPopulated] = useState(false);

    //local state
    const [localBill, setLocalBill] = useState([]);
    const [localTenant, setLocalTenant] = useState([]);

    //redux
    const dispatch = useDispatch()

    useEffect(() => {

        loadBill()
        loadTenant()

        dispatch(addBill(localBill))
        dispatch(addTenant(localTenant))

        //DEBUG
        console.log("useeffect dashboard --------------------------")
    }, [])

    //Mybill JSON async
    const loadBill = async () => {


        try {
            //DEBUG
            console.log("loadBill --------------------------")
            console.log(JSON.parse(jsonvalue))

            let jsonvalue = await AsyncStorage.getItem('@MyBill');

            if (jsonvalue !== null) {
                //save to redux
                //E.G = setBill(JSON.parse(jsonvalue));
                setLocalBill(JSON.parse(jsonvalue));
                setDataPopulated(true);
            } else {
                setDataPopulated(false);
            }

        } catch (err) {
            console.log(err)
        }


    }

    //MyTenant JSON async
    const loadTenant = async () => {



        try {

            //DEBUG
            console.log("loadTenant --------------------------")
            console.log(JSON.parse(jsonvalue))

            let jsonvalue = await AsyncStorage.getItem('@MyTenant');

            if (jsonvalue !== null) {
                //save to redux
                //E.G = setBill(JSON.parse(jsonvalue));
                setLocalTenant(JSON.parse(jsonvalue));
                setDataPopulated(true);
            } else {
                setDataPopulated(false);
            }

        } catch (err) {
            console.log(err)
        }
    }

    

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
                        {/* ADD NEW TENANT IN SETTING PAGE */}
                        {/* <ModalButton
                            onPress={() => {
                                // console.log("Add tenant modal invoked!")
                                setAddTenantModal(true)
                            }}
                        >
                            <Ionicons name="person-add" size={24} color="black" />
                        </ModalButton> */}

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


export const DashboardWrapper = () => {

    return (
        <Provider store={Store} >
            <Dashboard />
        </Provider>
    );

}


export default DashboardWrapper;