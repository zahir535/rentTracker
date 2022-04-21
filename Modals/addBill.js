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

//async
import AsyncStorage from '@react-native-async-storage/async-storage';

//redux
import { useSelector, useDispatch, Provider } from 'react-redux';
import {
    selectTenant,
    addBill,
    selectBill,
} from './../Redux/reduxSlice';
import Store from './../Redux/storeRedux';


const AddBill = ({ props, closeAddBillModal }) => {

    //redux dispatch
    const dispatch = useDispatch();
    //getBilldatafirst
    const data = useSelector(selectBill)

    //onsubmit bills
    const addBillSubmit = (values) => {

        //destructure formik values
        const { billName, billTotal, paidby } = values;

        //get date
        const dayOfMonth = new Date().getDate().toString();
        const monthOfYear = new Date().getMonth().toString();
        const year = new Date().getFullYear().toString();

        const date = dayOfMonth + "/" + monthOfYear + "/" + year;

        //get current all bill length from async
        let length = data.length;
        let newBillNo = length + 1;

        //create new bill object
        let newBill = {}
        newBill.billNo = parseInt(newBillNo);
        newBill.billName = billName;
        newBill.billTotal = parseInt(billTotal);
        newBill.billDate = date;
        newBill.paidby = paidby;

        console.log(newBill)

        //save to redux
        let newArray = [ ...data, newBill];
        dispatch(addBill(newArray))

        //after saved data - closed modal
        closeAddBillModal()
        showToast()

    }

    //toast message
    const showToast = () => {
        ToastAndroid.show("New bill saved !",
            ToastAndroid.SHORT);
    };

    return (
        <InnerContainer>

            <HorizontalViewTop>
                <PageTitle>Add New bill</PageTitle>
                <ModalButton
                    onPress={() => {
                        closeAddBillModal()
                    }}

                >
                    <PageTitle>X</PageTitle>
                </ModalButton>
            </HorizontalViewTop>


            <SpaceBreak></SpaceBreak>

            <Formik
                initialValues={{
                    billName: '',
                    billTotal: 0,
                    paidby: '',
                }}
                onSubmit={values => {
                    console.log(values)
                    addBillSubmit(values)
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <NormalText>Bill Name:</NormalText>
                        <InputField
                            placeholder='bill Name'
                            onChangeText={handleChange('billName')}
                            onBlur={handleBlur('billName')}
                            value={values.billName}
                        />
                        <NormalText>Bill Total:</NormalText>
                        <InputField
                            placeholder='bill Total'
                            onChangeText={handleChange('billTotal')}
                            onBlur={handleBlur('billTotal')}
                            value={values.billTotal.toString()}
                            keyboardType='numeric'
                        />
                        <NormalText>Paid By:</NormalText>
                        <InputField
                            placeholder='paid by'
                            onChangeText={handleChange('paidby')}
                            onBlur={handleBlur('paidby')}
                            value={values.paidby}
                        />
                        <AddTenantButton
                            onPress={handleSubmit} title="Submit"
                        >
                            <StrongText>Add Bill</StrongText>
                        </AddTenantButton>
                    </View>
                )}
            </Formik>

        </InnerContainer>
    );
}

const AddBillWrapper = ({closeAddBillModal}) => {
    return(
        <Provider store={Store}>
            <AddBill closeAddBillModal={closeAddBillModal} />
        </Provider>
    );
}

export default AddBillWrapper;