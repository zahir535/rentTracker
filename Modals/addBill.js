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
    ButtonCenterTextChecked,
    ToPayWrapper,
    ToPayButton,
    ToPaybuttonChecked,
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
    addTenant,
    updateTenant,
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

    //check how many state==true in toPayData
    let count;

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

        //get name value only from toPayData
        let payString = [];
        toPayData.forEach(element => {
            payString.push(element.name);
        });

        //create new bill object
        let newBill = {}
        newBill.billNo = parseInt(newBillNo);
        newBill.billName = billName;
        newBill.billTotal = parseFloat(billTotal);
        newBill.billDate = date;
        newBill.paidby = selectedPick;
        newBill.toPayState = payString.toString();

        // console.log(newBill)
        // console.log(typeof selectedPick)


        //check how many state==true in toPayData
        //let count = 0;
        // toPayData.forEach(element => {
        //     if (element.state == true) {
        //         count += 1;
        //     }
        // });

        //validation of selectedpick
        if (selectedPick == null || count == 0) {
            if (selectedPick == null) {
                ToastAndroid.show("Paid By not selected",
                    ToastAndroid.SHORT);
            }
            if (count == 0) {
                ToastAndroid.show("ToPay not selected",
                    ToastAndroid.SHORT);
            }

        } else {
            //save to redux bill
            let newArray = [...data, newBill];
            dispatch(addBill(newArray))

            //update redux tenant data
            //calculation
            billCalcPayAdv(billTotal)

            //billCalcToPay(billTotal)

            //after saved data - closed modal
            closeAddBillModal()
            showToast()

        }
    }


    //calculation
    const billCalcPayAdv = (billTotal) => {


        //payAdv calc - selectedPick
        //update tenant REDUX if tenant data name == selectedPick
        // newTenant.id = arrayLength + 1;
        // newTenant.name = name;
        // newTenant.toPay = 0;
        // newTenant.payAdv = 0;
        let newTenantData = [];
        tenantData.forEach(item => {
            let obj = {};
            let val = parseFloat(billTotal)

            //condition item.name == selectedPick
            if (item.name == selectedPick) {
                //update payAdv value if matched, other value stay original
                obj.id = item.id;
                obj.name = item.name;
                obj.toPay = item.toPay;
                obj.payAdv = item.payAdv + val;

                console.log("billtotal/val - " + typeof val)
                console.log(item.name + " / " + val)
            } else {

                //if not matched, all val original
                obj.id = item.id;
                obj.name = item.name;
                obj.toPay = item.toPay;
                obj.payAdv = item.payAdv;
            }
            newTenantData.push(obj);
        });
        // tenantData.map((item) => {
        //     let obj = {};
        //     let val = parseFloat(billTotal)

        //     //condition item.name == selectedPick
        //     if (item.name == selectedPick) {
        //         obj.id = item.id;
        //         obj.name = item.name;
        //         obj.toPay = item.toPay;
        //         obj.payAdv = item.payAdv + val;

        //         console.log("billtotal/val - " + typeof val)
        //         console.log(item.name + " / " + val)
        //     }

        //     newTenantData.push(obj);
        // })

        //update new state to redux after tenant data changed
        dispatch(updateTenant(newTenantData))

        console.log("billCalcPayAdv ------------")
        console.log(newTenantData)
    }
    const billCalcToPay = (billTotal) => {

        //toPay calc
        //update tenant REDUX if item.state from toPayData == true
        // newTenant.id = arrayLength + 1; -- tenantData Schema
        // newTenant.name = name;
        // newTenant.toPay = 0;
        // newTenant.payAdv = 0;
        let toPayTenantData = [];

        //check how many state==true in toPayData
        let count = 0;
        toPayData.forEach(element => {
            if (element.state == true) {
                count += 1;
            }
        });

        //only then calc toPayData
        let dividedVal = billTotal / count;
        tenantData.forEach(item => {
            let obj = {};
            // obj.name = item.name;  -- toPayData Schema
            // obj.state = false;
            toPayData.map((element) => {
                if (element.name == item.name || element.state == true) {

                    // if state == true, sum of toPay, others original val
                    obj.id = item.id;
                    obj.name = item.name;
                    obj.toPay = item.toPay + dividedVal;
                    obj.payAdv = item.payAdv;

                    console.log("dividedVal - " + typeof dividedVal)
                    console.log(item.name + " / " + dividedVal)

                } else {

                    //if not matched, assign original val
                    obj.id = item.id;
                    obj.name = item.name;
                    obj.toPay = item.toPay;
                    obj.payAdv = item.payAdv;
                }
            })

            toPayTenantData.push(obj);
        });


        // tenantData.map((item) => {
        //     let obj = {};

        //     // obj.name = item.name;  -- toPayData Schema
        //     // obj.state = false;
        //     toPayData.map((element) => {
        //         if (item.name == element.name) {

        //             // if matched, sum of toPay, others original val
        //             obj.id = item.id;
        //             obj.name = item.name;
        //             obj.toPay = item.toPay + dividedVal;
        //             obj.payAdv = item.payAdv;

        //             console.log("dividedVal - " + typeof dividedVal)
        //             console.log(item.name + " / " + dividedVal)

        //         } else {

        //             //if not matched, assign original val
        //             obj.id = item.id;
        //             obj.name = item.name;
        //             obj.toPay = item.toPay;
        //             obj.payAdv = item.payAdv;
        //         }
        //     })

        //     toPayTenantData.push(obj);
        // })

        //update new state to redux after tenant data changed
        dispatch(addTenant(toPayTenantData))

        //console.log("-")
        // console.log("All tenant data Here ---------------------------")
        // console.log(tenantData)

    }


    //toast message
    const showToast = () => {
        ToastAndroid.show("New bill saved !",
            ToastAndroid.SHORT);
    };

    //local state picker (payAdv)
    const [selectedPick, setSelectedPick] = useState();

    //update local state
    const allTrueState = () => {
        //update toPayState REDUX if tenant data changed
        //need to update obj.state = true everytime fx is called
        let newPayState = [];
        tenantData.map((item) => {
            let obj = {};
            obj.name = item.name;
            obj.state = true;
            newPayState.push(obj);
        })

        //update new state to redux after tenant data changed
        dispatch(updateToPayState(newPayState))

        //update count
        updateCount()
    }
    const updateTenantState = (selectedName) => {
        //update toPayState REDUX if tenant data changed
        //need to update obj.state = !item.state for matched selectedName == item.name
        let newPayState = [];
        toPayData.map((item) => {
            let obj = {};

            //conditioned changed for selectedName
            if (item.name == selectedName) {
                obj.name = item.name;
                obj.state = !item.state;
            } else {
                obj.name = item.name;
                obj.state = item.state;
            }
            newPayState.push(obj);
        })

        //update new state to redux after tenant data changed
        dispatch(updateToPayState(newPayState))

        //update count
        updateCount()
    }

    //update count
    const updateCount = () => {
        toPayData.forEach(element => {
            if (element.state == true) {
                count += 1;
            }
        });
    }


    //useEffect
    useEffect(() => {
        //update toPayState REDUX if tenant data changed
        //need to update obj.state = false everytime modal is called
        let newPayState = [];
        tenantData.map((item) => {
            let obj = {};
            obj.name = item.name;
            obj.state = true;
            newPayState.push(obj);
        })

        //update new state to redux after tenant data changed
        dispatch(updateToPayState(newPayState))

        // cant put [toPayData] below. The app will crash/ not responding
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
                        billTotal: '',
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
                            <ToPayArea
                                label="To Pay:"
                                toPayData={toPayData}
                                allTrueState={allTrueState}
                                updateTenantState={updateTenantState}
                            />

                            <SmallSpaceBreak />

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

const ToPayArea = ({ label, toPayData, allTrueState, updateTenantState, ...props }) => {
    return (
        <View>
            <NormalText>{label}</NormalText>
            <ToPayWrapper>

                <ToPayButton
                    onPress={() => {
                        allTrueState()
                    }}
                >
                    <ButtonCenterText>All</ButtonCenterText>
                </ToPayButton>


                {
                    toPayData.map((item, i) => {

                        if (item.state == true) {
                            return (
                                <ToPaybuttonChecked key={i}
                                    onPress={() => {
                                        updateTenantState(item.name)
                                    }}
                                >
                                    <ButtonCenterTextChecked>{item.name}</ButtonCenterTextChecked>
                                </ToPaybuttonChecked>
                            );
                        }
                        if (item.state == false) {
                            return (
                                <ToPayButton key={i}
                                    onPress={() => {
                                        updateTenantState(item.name)
                                    }}
                                >
                                    <ButtonCenterText>{item.name}</ButtonCenterText>
                                </ToPayButton>
                            );
                        }

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