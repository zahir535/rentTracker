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
    selectTenantModal,
    selectBill,
} from './../Redux/reduxSlice';
import Store from './../Redux/storeRedux';


//show data dashboard
import SummaryWrapper from '../Redux/SummaryWrapper';
import BillWrapper from "../Redux/BillWrapper";


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
                        Alert.alert("Modal has been closed.");
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