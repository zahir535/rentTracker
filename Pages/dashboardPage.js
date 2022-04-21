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
    HorizontalView,
    ModalButton,
    ModalView
} from './../UiComponents/uiComponents';

//addtenant modal
import AddTenant from "../Modals/addTenant";
//addbill modal
import AddBill from "../Modals/addBill";

//async
import AsyncStorage from '@react-native-async-storage/async-storage';

//icon
import { Ionicons, Entypo } from '@expo/vector-icons';

//redux test: counter & tenant
import CounterWrapper from "../Counter/Counter";
import ArrayRedWrapper from "../ArrayRed/AddArray";



//create new tenant
const createTenant = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@tenant', jsonValue)
    } catch (e) {
        console.log("Error when create new tenant" + e)
    }
}



const Dashboard = () => {

    //modal state
    const [addTenantModal, setAddTenantModal] = useState(false);
    const closeAddTenantModal = () => {
        setAddTenantModal(false);
    }
    const [addBillModal, setAddBillModal] = useState(false);
    const closeAddBillModal = () => {
        setAddBillModal(false);
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
                        Alert.alert("Modal has been closed.");
                        setAddTenantModal(!addTenantModal);
                    }}
                >
                    <ModalView>
                        <AddTenant
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
                        Alert.alert("Modal has been closed.");
                        setAddBillModal(!addBillModal);
                    }}
                >
                    <ModalView>
                        <AddBill
                            closeAddBillModal={closeAddBillModal}
                        />
                    </ModalView>


                </Modal>

                <HorizontalView>
                    <PageTitle>Dashboard</PageTitle>

                    <HorizontalView>
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
                    </HorizontalView>
                </HorizontalView>

                <OuterShadowBox>
                    <InnerShadowBox>
                        <StrongText>Summary:</StrongText>
                        {/* SUMMARY OF TENANT NAME & DETAILS */}
                    </InnerShadowBox>
                </OuterShadowBox>


                <OuterShadowBox>
                    <InnerShadowBox>
                        <StrongText>Bills:</StrongText>
                        {/* SUMMARY OF BILL DETAILS */}

                        <ArrayRedWrapper />
                        
                    </InnerShadowBox>
                </OuterShadowBox>



            </InnerContainer>
        </StyledContainer>
    );
}


export default Dashboard;