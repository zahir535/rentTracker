import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

//import UI
import {
    StyledContainer,
    OuterShadowBox,
    InnerShadowBox,
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


//onsubmit
const addTenant = async (values) => {

    //getTenantdatafirst

    const { name } = values;
    //check if stored value key exists or not

    let newTenant = {}
    newTenant.name = name;
    newTenant.payAdv = 0;
    newTenant.toPay = 0;


    try {
        const jsonValue = JSON.stringify(newTenant)
        await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
        console.log("Error when create new tenant" + e)
    }
}

const AddTenant = ({ props, closeAddTenantModal }) => {
    return (
        <InnerContainer>

            <HorizontalView>
                <PageTitle>Add New Tenant</PageTitle>
                <ModalButton
                    onPress={() => {
                        closeAddTenantModal()
                        // console.log("add tenant modal closed!")
                    }}

                >
                    <PageTitle>X</PageTitle>
                </ModalButton>
            </HorizontalView>


            <SpaceBreak></SpaceBreak>

            <Formik
                initialValues={{ name: '' }}
                onSubmit={values => {
                    console.log(values)
                    addTenant(values)
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