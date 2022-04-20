import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';

//import UI
import {
    StyledContainer,
    InnerContainer,
    InnerShadowBox,
    OuterShadowBox,
    PageTitle,
    StrongText,
    CenteredView,
    LoginButton,
    GoogleIcon,
    SmallSpaceBreak,
    HorizontalView,
    ModalButton,
    ModalView
} from './../UiComponents/uiComponents';

//addtenant modal
import AddTenant from "../Modals/addTenant";

//async
import AsyncStorage from '@react-native-async-storage/async-storage';

//formik
import { Formik } from 'formik';


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

    const [addTenantModal, setAddTenantModal] = useState(false);
    const closeAddTenantModal = () => {
        setAddTenantModal(false);
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

                <HorizontalView>
                    <PageTitle>Dashboard</PageTitle>
                    <ModalButton
                        onPress={() => {
                            // console.log("Add tenant modal invoked!")
                            setAddTenantModal(true);
                        }}
                    >
                        <PageTitle>+</PageTitle>
                    </ModalButton>
                </HorizontalView>

                <OuterShadowBox>
                    <InnerShadowBox>
                        <StrongText>Summary:</StrongText>
                        {/* SUMMARY OF TENANT NAME & DETAILS */}
                    </InnerShadowBox>
                </OuterShadowBox>



            </InnerContainer>
        </StyledContainer>
    );
}


export default Dashboard;