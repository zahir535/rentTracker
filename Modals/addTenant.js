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
    HorizontalViewTop
} from './../UiComponents/uiComponents';

//formik
import { Formik } from 'formik';

//keyboardavoiding view
import KeyboardAvoidingWrapper from '../UiComponents/KeyboardAvoidingWrapper';

//redux
import { useSelector, useDispatch, Provider } from 'react-redux';
import {
    addTenant,
    selectTenant,
} from './../Redux/reduxSlice';
import Store from './../Redux/storeRedux';



const AddTenant = ({ props, closeAddTenantModal }) => {

    //redux dispatch
    const dispatch = useDispatch();
    //getTenantdatafirst
    const data = useSelector(selectTenant)

    const arrayLength = data.length;

    //onsubmit tenant
    const addTenantSubmit = (values) => {

        //destructure formik values
        const { name } = values;

        //create new tenant object
        let newTenant = {}
        newTenant.id = arrayLength + 1;
        newTenant.name = name;
        newTenant.toPay = 0;
        newTenant.payAdv = 0;


        //name input field cant be empty && length < 8
        if (name == '' || name.length > 8) {
            if (name == '') {
                ToastAndroid.show("Name is empty !",
                    ToastAndroid.SHORT);
            }
            if (name.length > 8) {
                ToastAndroid.show("Name too long !",
                    ToastAndroid.SHORT);
            }
        } else {
            //dispatch new array that contains new data - tenant
            let newArray = [...data, newTenant];
            dispatch(addTenant(newArray))

            //after tenant data saved - close modal
            closeAddTenantModal()
            showToast()
        }

    }


    //toast success message
    const showToast = () => {
        ToastAndroid.show("New tenant added !",
            ToastAndroid.SHORT);
    };

    return (
        <KeyboardAvoidingWrapper>
            <InnerContainer>

                <HorizontalViewTop>
                    <PageTitle>Add New Tenant</PageTitle>
                    <ModalButton
                        onPress={() => {
                            closeAddTenantModal()
                        }}

                    >
                        <PageTitle>X</PageTitle>
                    </ModalButton>
                </HorizontalViewTop>


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
        </KeyboardAvoidingWrapper>
    );
}

const AddTenantWrapper = ({ closeAddTenantModal }) => {
    return (
        <Provider store={Store}>
            <AddTenant
                closeAddTenantModal={closeAddTenantModal}
            />
        </Provider>
    );
}

export default AddTenantWrapper;