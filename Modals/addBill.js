import React, { useState, useEffect } from 'react';
import { View, ToastAndroid, Text } from 'react-native';

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
    HorizontalViewTop,
    HorizontalView,
    SmallSpaceBreak,
    SquareButton,
    InputFieldArray,
    PickerWrapper,
    ScrollList,
    ButtonCenterText,
    ToPayWrapper,
    ToPayButton,
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
    updateToPayState,
    selectToPayState,
} from './../Redux/reduxSlice';
import Store from './../Redux/storeRedux';

//picker
import { Picker } from '@react-native-picker/picker';



const AddBill = ({ props, closeAddBillModal }) => {

    //redux dispatch
    const dispatch = useDispatch();
    //getBilldatafirst
    const data = useSelector(selectBill)
    //getTenantdata
    const tenantData = useSelector(selectTenant)
    //get toPayState
    const toPayData = useSelector(selectToPayState)

    //onsubmit bills
    const addBillSubmit = (values) => {

        //destructure formik values
        const { billName, billTotal } = values;

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
        newBill.paidby = selectedPick;

        // console.log(newBill)
        // console.log(typeof selectedPick)

        //validation of selectedpick
        if (selectedPick == null) {
            ToastAndroid.show("Paid By not selected",
                ToastAndroid.SHORT);
        } else {
            //save to redux bill
            let newArray = [...data, newBill];
            dispatch(addBill(newArray))

            //update redux tenant data
            // some function

            //after saved data - closed modal
            closeAddBillModal()
            showToast()
        }

    }


    //toast message
    const showToast = () => {
        ToastAndroid.show("New bill saved !",
            ToastAndroid.SHORT);
    };

    //local state picker (payAdv)
    const [selectedPick, setSelectedPick] = useState();

    //local state toPay
    const [localToPay, setLocalToPay] = useState([]);

    //update local state
    const allTrueState = () => {
        localToPay.forEach(element => {
            element.state = true;
        });
    }

    //calculation
    const billCalc = () => {
    }

    //useEffect
    useEffect(() => {
        //update toPayState REDUX if tenant data changed
        //need to update obj.state = false everytime modal is called
        let newPayState = [];
        tenantData.map((item) => {
            let obj = {};
            obj.name = item.name;
            obj.state = false;
            newPayState.push(obj);
        })

        //save to lacl state to be used
        setLocalToPay(newPayState)
        // console.log(tenantData)
        // console.log("new State" + newPayState)

        //update new state to redux after tenant data changed
        dispatch(updateToPayState(newPayState))

    }, [tenantData]);

    return (
        <ScrollList>
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

                <SmallSpaceBreak></SmallSpaceBreak>

                {/**FORMIK BILL NAME & BILL TOTAL */}
                <Formik
                    initialValues={{
                        billName: '',
                        billTotal: 0,
                    }}
                    onSubmit={values => {
                        //console.log(values)
                        addBillSubmit(values)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <InputArea
                                label='Bill name:'
                                placeholder='bill Name'
                                onChangeText={handleChange('billName')}
                                onBlur={handleBlur('billName')}
                                value={values.billName}
                            />

                            <InputArea
                                label='Bill Total:'
                                placeholder='bill Total'
                                onChangeText={handleChange('billTotal')}
                                onBlur={handleBlur('billTotal')}
                                value={values.billTotal.toString()}
                                keyboardType='numeric'
                            //for password use - security
                            //secureTextEntry={true}
                            />

                            {/* PICKER  */}
                            <PickerArea
                                label="Paid By:"
                                selectedPick={selectedPick}
                                setSelectedPick={setSelectedPick}
                                tenantData={tenantData}
                            />

                            {/* CUSTOM BUTTON & FX */}
                            <NormalText>To Pay:</NormalText>
                            <ToPayWrapper>
                                <ToPayButton
                                //ERROR : TypeError: Attempted to assign to readonly property.
                                // onPress={() => {
                                //     allTrueState()
                                // }}
                                >
                                    <ButtonCenterText>All</ButtonCenterText>
                                </ToPayButton>
                                {
                                    toPayData.map((item, i) => {
                                        return (
                                            <ToPayButton key={i} >
                                                <ButtonCenterText>{item.name}</ButtonCenterText>
                                            </ToPayButton>
                                        );
                                    })
                                }
                            </ToPayWrapper>

                            <ToPayArea
                                label="To Pay:"
                                toPayData={toPayData}
                                allTrueState={allTrueState}
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
        </ScrollList>

    );
}

const InputArea = ({ label, icon, ...props }) => {
    return (
        <View>
            <NormalText>{label}</NormalText>
            <InputField {...props} />
        </View>
    );
}

const PickerArea = ({ label, setSelectedPick, selectedPick, tenantData, ...props }) => {
    return (
        <View>
            <NormalText>{label}</NormalText>
            <PickerWrapper>
                <Picker
                    selectedValue={selectedPick}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedPick(itemValue)
                    }>
                    <Picker.Item label=" --- pick tenant --- " value="null" />
                    {
                        tenantData.map((item, i) => {
                            return (
                                <Picker.Item label={item.name} value={item.name} key={i} />
                            );
                        })
                    }
                </Picker>
            </PickerWrapper>
        </View>
    );
}

const ToPayArea = ({ label, toPayData, allTrueState, ...props }) => {
    return (
        <View>
            <NormalText>{label}</NormalText>
            <ToPayWrapper>
                <ToPayButton
                //ERROR : TypeError: Attempted to assign to readonly property.
                // onPress={() => {
                //     allTrueState()
                // }}
                >
                    <ButtonCenterText>All</ButtonCenterText>
                </ToPayButton>
                {
                    toPayData.map((item, i) => {
                        return (
                            <ToPayButton key={i} >
                                <ButtonCenterText>{item.name}</ButtonCenterText>
                            </ToPayButton>
                        );
                    })
                }
            </ToPayWrapper>
        </View>
    );
}

const AddBillWrapper = ({ closeAddBillModal }) => {
    return (
        <Provider store={Store}>
            <AddBill closeAddBillModal={closeAddBillModal} />
        </Provider>
    );
}

export default AddBillWrapper;