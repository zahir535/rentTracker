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
    updateCount,
    selectCount,
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
    //get count
    const count = useSelector(selectCount)

    //local state picker (payAdv)
    const [selectedPick, setSelectedPick] = useState();

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

        //DEBUG
        console.log("------------- useEffect -----------------")
        console.log(newPayState);


        //update count
        //updateCountFx()

        // cant put [toPayData] below. The app will crash/ not responding
    }, []);

    //onsubmit bills
    const addBillSubmit = (values) => {

        //destructure formik values
        // initialValues={{
        //     billName: '',
        //     billTotal: '',
        // }}
        const { billName, billTotal } = values;

        //bill no - get current all bill length from async
        let length = data.length;
        let newBillNo = length + 1;

        //bill name -decide bill name to default = "Bill #" + parseinte(newBillNo) if null || ""
        let finalBillname = "";
        if (billName == null || billName == "") {
            finalBillname = "Bill #" + parseInt(newBillNo);
        } else {
            finalBillname = billName;
        }

        //billtotal - no xtra conditions

        //bill date - get date
        const dayOfMonth = new Date().getDate().toString();
        const monthOfYear = new Date().getMonth().toString();
        const year = new Date().getFullYear().toString();
        const date = dayOfMonth + "/" + monthOfYear + "/" + year;

        //paidby - no xtra conditions

        //toPayState - get name value only from toPayData
        const payString = [];

        toPayData.forEach(element => {
            if (element.state.toString() == "true") {
                let s = element.name;
                payString.push(s);
            }
        });



        //create new bill object
        let newBill = {}
        newBill.billNo = parseInt(newBillNo);
        newBill.billName = finalBillname;
        newBill.billTotal = parseFloat(billTotal);
        newBill.billDate = date;
        newBill.paidby = selectedPick;
        newBill.toPayState = payString.toString();


        //validation of bill total, paid by, toPayState
        //condition bill total = billTotal == "" false, else true
        //condition paidby  = selectedPick == null false, else true
        //condition toPayState = 



        if (selectedPick == null || (billTotal == '' || toPayCondition() == true)) {
            if (billTotal == '') {
                ToastAndroid.show("bill Total field is empty",
                    ToastAndroid.SHORT);
            }
            if (selectedPick == null) {
                ToastAndroid.show("Paid By not selected",
                    ToastAndroid.SHORT);
            }
            if (toPayCondition() == undefined) {
                ToastAndroid.show("no toPay selected",
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

            //debug - console.log TIME
            const logTime = new Date().getTime();
            console.log(logTime + " / " + typeof logTime);


        }
    }


    //calculation
    const billCalcPayAdv = (billTotal) => {

        console.log("billCalcPayAdv ------------")

        //payAdv calc - selectedPick
        //update tenant REDUX if tenant data name == selectedPick
        // newTenant.id = arrayLength + 1;
        // newTenant.name = name;
        // newTenant.toPay = 0;
        // newTenant.payAdv = 0;
        let newTenantData = [];
        let val = parseFloat(billTotal)

        tenantData.forEach(item => {
            let obj = {};

            //condition item.name == selectedPick
            if (item.name == selectedPick) {
                //update payAdv value if matched, other value stay original
                obj.id = item.id;
                obj.name = item.name;
                obj.toPay = item.toPay;
                obj.payAdv = item.payAdv + val;

                //DEBUG
                // console.log("billtotal/val - " + typeof val)
                // console.log(item.name + " / " + val)
            } else {

                //if not matched, all val original
                obj.id = item.id;
                obj.name = item.name;
                obj.toPay = item.toPay;
                obj.payAdv = item.payAdv;
            }

            newTenantData.push(obj);
        });

        dispatch(updateTenant(newTenantData))

        //DEBUG
        //console.log(newTenantData)
    }
    const billCalcToPay = (billTotal) => {

        console.log("billCalcToPay ------------")

        //toPay calc
        //update tenant REDUX if item.state from toPayData == true
        // newTenant.id = arrayLength + 1; -- tenantData Schema
        // newTenant.name = name;
        // newTenant.toPay = 0;
        // newTenant.payAdv = 0;

        const arrChecker = [];
        // just need to check string
        //bcs order of name from tenantData & toPayData is same. 
        //only different properties in state
        toPayData.forEach(element => {
            let s = element.state.toString();
            arrChecker.push(s);
        });

        //only then calc toPayData
        let dividedVal = billTotal / count;

        //initialize new array, to be immutable into redux        
        let toPayTenantData = [];

        arrChecker.forEach((element, i) => {

            let object = {};

            if (element == "true") {
                // if state == "true", sum of toPay, others original val
                object.id = tenantData[i].id;
                object.name = tenantData[i].name;
                object.toPay = tenantData[i].toPay + dividedVal;
                object.payAdv = tenantData[i].payAdv;

                console.log("dividedVal ==> ")
                console.log(typeof dividedVal)
                console.log(tenantData[i].name + " / " + dividedVal)
            }

            if (element == "false") {
                // if state == "false", sum of toPay, others original val
                object.id = tenantData[i].id;
                object.name = tenantData[i].name;
                object.toPay = tenantData[i].toPay;
                object.payAdv = tenantData[i].payAdv;
            }

            toPayTenantData.push(object);
        });

        //update new state to redux after tenant data changed
        dispatch(addTenant(toPayTenantData))


        console.log("divideval:" + dividedVal + "  -  ")
        console.log(toPayTenantData)

    }


    //toast message successfull
    const showToast = () => {
        ToastAndroid.show("New bill saved !",
            ToastAndroid.SHORT);
    };

    //topayState condition
    const toPayCondition = () => {
        const arr = [];

        toPayData.forEach(element => {
            let s = element.state.toString();
            arr.push(s);
        });

        console.log(arr)

        const isNotZero = (e) => e == "true";
        console.log("find fx ==> " + arr.find(isNotZero));

        // return true if array have a val == true
        return arr.find(isNotZero);
    }



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

        //DEBUG
        console.log("------------- allTrueState -----------------")
        console.log(newPayState);

        //update count
        //updateCountFx()
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

        //DEBUG
        console.log("------------- updateTenantState -----------------")
        console.log(newPayState);

        //update count
        //updateCountFx()
    }

    // //check how many state==true in toPayData
    const updateCountFx = () => {
        console.log("updateCount FX ------------ >")

        //re-initialize count = 0 everytime call updatecount fx
        // obj.name = item.name;
        // obj.state = true;
        let localCount = 6;
        toPayData.map((item) => {
            if (item.state == true) {
                console.log("true - " + item.name)
            } else {
                console.log("false - " + item.name)
            }
        })

        //update count redux val
        dispatch(updateCount(localCount))

        console.log("count val: " + count)
    }




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

    console.log("-------- PickerArea ---------")
    console.log(selectedPick)

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