import React, { useState, useEffect } from 'react';
import { View, ToastAndroid } from 'react-native';

//import UI
import {
    InnerContainer,
    PageTitle,
    StrongText,
    NormalText,
    InputField,
    AddTenantButton,
    SpaceBreak,
    ModalButton,
    HorizontalView
} from './../UiComponents/uiComponents';

//formik
import { Formik } from 'formik';

//async
import AsyncStorage from '@react-native-async-storage/async-storage';



const AddTenant = ({ props, closeAddTenantModal }) => {

    //onsubmit tenant
    const addTenantSubmit = (values) => {

        //getTenantdatafirst


        //destructure formik values
        const { name } = values;

        //create new tenant object
        let newTenant = {}
        newTenant.name = name;
        newTenant.payAdv = 0;
        newTenant.toPay = 0;

        //save to async
        // try {
        //     const jsonValue = JSON.stringify(newTenant)
        //     await AsyncStorage.setItem('@storage_Key', jsonValue)
        // } catch (e) {
        //     console.log("Error when create new tenant" + e)
        // }

        //after tenant data saved - close modal
        closeAddTenantModal()
        showToast()
    }

    //toast message
    const showToast = () => {
        ToastAndroid.show("New tenant added !",
            ToastAndroid.SHORT);
    };

    return (
        <InnerContainer>

            <HorizontalView>
                <PageTitle>Add New Tenant</PageTitle>
                <ModalButton
                    onPress={() => {
                        closeAddTenantModal()
                    }}

                >
                    <PageTitle>X</PageTitle>
                </ModalButton>
            </HorizontalView>


            <SpaceBreak></SpaceBreak>

            <Formik
                initialValues={{ name: '' }}
                onSubmit={values => {
                    addTenantSubmit(values)
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <NormalText>Name:</NormalText>
                        <InputField
                            placeholder='name'
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                        <AddTenantButton
                            onPress={handleSubmit} title="Submit"
                        >
                            <StrongText>Add tenant</StrongText>
                        </AddTenantButton>
                    </View>
                )}
            </Formik>

        </InnerContainer>
    );
}

export default AddTenant;