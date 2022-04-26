import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity, ToastAndroid } from 'react-native';
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
    HorizontalView,
    HalfNormalText,
    SmallSpaceBreak,
    SquareButton,
    NormalText,
    HorizontalViewEnd,
    LineNormalText,
    ShowButton,
} from './../UiComponents/uiComponents';

//icon
import { Ionicons, Entypo, MaterialIcons, EvilIcons } from '@expo/vector-icons';

//redux
import { useSelector, useDispatch, Provider } from 'react-redux';
import {
    addTenant,
    selectTenant,
    updateTenant,
    addBill,
    selectBill,
    updateTotalBill,
    selectTotalbill,
    addMonthly,
    selectMonthly,
} from './../Redux/reduxSlice';
import Store from './../Redux/storeRedux';

//addtenant modal
import AddTenantWrapper from "../Modals/addTenant";

//async
import AsyncStorage from '@react-native-async-storage/async-storage';



const Setting = () => {

    //get tenant data
    const data = useSelector(selectTenant)
    //get bill data
    const billData = useSelector(selectBill)
    //get totalbilldata
    const totalBillRedux = useSelector(selectTotalbill)
    //get monthly data
    const monthlyData = useSelector(selectMonthly)

    //dispatch
    const dispatch = useDispatch()

    //modal state using usestate
    const [addTenantModal, setAddTenantModal] = useState(false);
    const closeAddTenantModal = () => {
        setAddTenantModal(false);
    }
    const [deleteTenantModal, setDeleteTenantModal] = useState(false);
    const closeDeleteTenantModal = () => {
        setDeleteTenantModal(false);
    }
    const [pastDataModal, setPastDataModal] = useState(false);
    const closePastDataModal = () => {
        setPastDataModal(false);
    }

    //clear tenant data
    const clearTenant = () => {

        let newTenantData = [];


        data.forEach(item => {

            let obj = {};

            //clear all toPay & payAdv = 0
            obj.id = item.id;
            obj.name = item.name;
            obj.toPay = 0;
            obj.payAdv = 0;

            newTenantData.push(obj);
        });




        dispatch(updateTenant(newTenantData))
        saveToAsyncTenant(newTenantData)
    }
    //clear bill data
    const clearBill = () => {

        let newBillData = [];

        dispatch(addBill(newBillData))
        saveToAsyncBill(newBillData)
    }

    //fx save to async
    const saveToAsyncBill = async (newBillData) => {
        try {
            await AsyncStorage.setItem('@MyBill', JSON.stringify(newBillData));
        } catch (err) {
            ToastAndroid.show(err,
                ToastAndroid.SHORT);
        }
    };

    //fx save to async
    const saveToAsyncTenant = async (newTenantData) => {
        try {
            await AsyncStorage.setItem('@MyTenant', JSON.stringify(newTenantData));
        } catch (err) {
            ToastAndroid.show(err,
                ToastAndroid.SHORT);
        }
    };

    //delete specific tenant
    const deleteOneTenant = (i) => {

        // onPress={() => {
        //     deleteOneTenant(i)
        // }}

        let filteredTenant = [];

        data.forEach((element, j) => {
            if (j != i) {
                filteredTenant.push(element);
            }
        });

        dispatch(updateTenant(filteredTenant))
        saveToAsyncTenant(filteredTenant)

    }

    //delete all bill
    const deleteAllTenant = (i) => {

        let filteredTenant = [];

        dispatch(updateTenant(filteredTenant))
        saveToAsyncTenant(filteredTenant)

    }

    //change Show val of monthly (show data & hide data)
    const updateShow = (i) => {
        let newMonthly = []

        monthlyData.forEach((element, j) => {

            let obj = {}
            let a = element.tenant;
            let b = element.bill;
            let c = element.total;
            let d = element.date;
            let e = element.show;

            if (i != j) {
                obj.tenant = a;
                obj.bill = b;
                obj.total = c;
                obj.date = d;
                obj.show = e;

                newMonthly.push(obj)
            } else {
                obj.tenant = a;
                obj.bill = b;
                obj.total = c;
                obj.date = d;
                obj.show = !e;

                newMonthly.push(obj)
            }
        });



        dispatch(addMonthly(newMonthly))
    }


    //save to monthly
    const saveToMonthly = () => {
        //bill date - get date
        const dayOfMonth = new Date().getDate().toString();
        const monthOfYear = new Date().getMonth().toString();
        const year = new Date().getFullYear().toString();
        const date = dayOfMonth + "/" + monthOfYear + "/" + year;

        let obj = {}

        obj.tenant = data;
        obj.bill = billData;
        obj.total = totalBillRedux || 0;
        obj.date = date;
        obj.show = false;

        let newMonthly = [...monthlyData, obj]

        dispatch(addMonthly(newMonthly))
    }

    //showpastdata handler
    const showPastDataHandler = (i) => {
        updateShow(i)
    }

    //DEBUG FX
    //delete all monthly data
    const deleteAllMonthly = () => {
        let newA = [];
        dispatch(addMonthly(newA))
    }

    //useEffect
    useEffect(() => {
        console.log("---------------------- useEffect setting")
    }, [monthlyData])

    const renderShow = () => {
        return (
            <View>
                {
                    tenant.map((element) => {
                        return (
                            <HalfNormalText>{element.name}  toPay: {element.toPay}   payAdv:{element.payAdv}</HalfNormalText>
                        );
                    })
                }
                <SpaceBreak />
                <SpaceBreak />
            </View>
        );
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
                        //Alert.alert("Modal has been closed.");
                        setAddTenantModal(!addTenantModal);
                    }}
                >
                    <ModalView>
                        <AddTenantWrapper
                            closeAddTenantModal={closeAddTenantModal}
                        />
                    </ModalView>


                </Modal>

                {/* MODAL CODE DELETE A TENANT*/}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={deleteTenantModal}
                    onRequestClose={() => {
                        //Alert.alert("Modal has been closed.");
                        setDeleteTenantModal(!deleteTenantModal);
                    }}
                >
                    <ModalView>
                        {/* <DeleteModal
                            data={data}
                            closeDeleteTenantModal={closeDeleteTenantModal}
                            deleteOneTenant={deleteOneTenant}
                        /> */}
                        <InnerContainer>

                            <NormalText>Delete Tenant: </NormalText>
                            <SpaceBreak />
                            {data.map((item, i) => {
                                return (
                                    <HorizontalView>
                                        <NormalText key={i} >{item.name}</NormalText>
                                        <SquareButton
                                            onPress={() => {
                                                deleteOneTenant(i)
                                            }}
                                        >
                                            <MaterialIcons name="delete" size={24} color="grey" style={{ opacity: .6, }} />
                                        </SquareButton>
                                    </HorizontalView>

                                );
                            })}


                            <AddTenantButton
                                onPress={() => {
                                    deleteAllTenant()
                                }}
                            >
                                <ButtonCenterText style={{ alignItems: 'center' }} >Delete All Tenant</ButtonCenterText>
                            </AddTenantButton>

                            <AddTenantButton
                                onPress={() => {
                                    closeDeleteTenantModal()
                                }}
                            >
                                <ButtonCenterText style={{ alignItems: 'center' }} >Close</ButtonCenterText>
                            </AddTenantButton>

                        </InnerContainer>
                    </ModalView>
                </Modal>


                {/* MODAL CODE TO SHOW PAST DATA*/}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={pastDataModal}
                    onRequestClose={() => {
                        //Alert.alert("Modal has been closed.");
                        setPastDataModal(!pastDataModal);
                    }}
                >
                    {/* obj.tenant = data;
                        obj.bill = billData;
                        obj.total = totalBillRedux; */}
                    <ModalView>
                        <InnerContainer>
                            <ScrollList>
                                <StrongText>Past Data: </StrongText>
                                <SpaceBreak />
                                {monthlyData.map((item, i) => {
                                    const { bill, tenant, total, date, show } = item;

                                    return (
                                        <View key={i}>
                                            {show ?
                                                <ShowButton
                                                    onPress={() => {
                                                        showPastDataHandler(i)
                                                    }}
                                                >
                                                    <HorizontalView>
                                                        <StrongText>Date: {date} / RM {total}</StrongText>
                                                        <EvilIcons name="arrow-up" size={24} color="black" />
                                                    </HorizontalView>
                                                </ShowButton>
                                                :
                                                <ShowButton
                                                    onPress={() => {
                                                        showPastDataHandler(i)
                                                    }}
                                                >
                                                    <HorizontalView>
                                                        <StrongText>Date: {date} / RM {total}</StrongText>
                                                        <EvilIcons name="arrow-down" size={24} color="black" />
                                                    </HorizontalView>
                                                </ShowButton>
                                            }
                                            {show ?
                                                <View>
                                                    {
                                                        tenant.map((element, m) => {
                                                            return (
                                                                <HalfNormalText key={m} >{element.name}  toPay: {element.toPay}   payAdv:{element.payAdv}</HalfNormalText>
                                                            );
                                                        })
                                                    }
                                                    <SpaceBreak/>
                                                    {
                                                        bill.map((element, k) => {
                                                            return (
                                                                <InnerContainer key={k} style={{ marginBottom: 12, }}>
                                                                    <HorizontalViewEnd>
                                                                        <HalfNormalText>{element.billNo})</HalfNormalText>

                                                                        <View style={{ flexDirection: 'row', marginLeft: 12, }} >
                                                                            <HalfNormalText>{element.billName}</HalfNormalText>
                                                                        </View>

                                                                        <View style={{ flexDirection: 'row', marginLeft: 70, }} >
                                                                            <HalfNormalText>total: </HalfNormalText>
                                                                            <HalfNormalText >{element.billTotal.toString().slice(0, 6)}</HalfNormalText>
                                                                        </View>
                                                                    </HorizontalViewEnd>

                                                                    <HorizontalViewEnd style={{ marginTop: 8, }} >
                                                                        <HalfNormalText style={{ marginLeft: 24, }} >{element.billDate}</HalfNormalText>
                                                                        <View style={{ flexDirection: 'row', marginLeft: 50 }} >
                                                                            <HalfNormalText>paid By: </HalfNormalText>
                                                                            <HalfNormalText>{element.paidby}</HalfNormalText>
                                                                        </View>
                                                                    </HorizontalViewEnd>

                                                                    <HorizontalViewEnd style={{ marginTop: 8, flexWrap: 'wrap' }} >
                                                                        <HalfNormalText style={{ marginLeft: 24, }} >toPay:  </HalfNormalText>
                                                                        <HalfNormalText>{element.toPayState.toString().slice(0, 35)}</HalfNormalText>
                                                                    </HorizontalViewEnd>

                                                                    <InnerContainer style={{ justifyContent: 'center', alignItems: 'center' }} >
                                                                        <LineNormalText>
                                                                            -------------------------------
                                                                        </LineNormalText>
                                                                    </InnerContainer>

                                                                </InnerContainer>
                                                            );
                                                        })
                                                    }
                                                    <SpaceBreak />
                                                </View>
                                                :
                                                <View>
                                                </View>
                                            }
                                        </View>
                                    );
                                })}


                                <AddTenantButton
                                    onPress={() => {
                                        closePastDataModal()
                                    }}
                                >
                                    <ButtonCenterText style={{ alignItems: 'center' }} >Close</ButtonCenterText>
                                </AddTenantButton>

                            </ScrollList>
                        </InnerContainer>
                    </ModalView>


                </Modal>

                {/* SETTING ORIGINAL CODE */}
                <HorizontalViewTop>
                    <PageTitle>Setting</PageTitle>

                    <HorizontalViewTop>
                        <ModalButton
                            onPress={() => {
                                // console.log("Add tenant modal invoked!")
                                setAddTenantModal(true)
                            }}
                        >
                            <Ionicons name="person-add" size={24} color="black" />
                        </ModalButton>
                    </HorizontalViewTop>
                </HorizontalViewTop>

                <SmallSpaceBreak />

                <AddTenantButton
                    onPress={() => {
                        saveToMonthly()
                        clearTenant()
                        clearBill()
                    }}
                >
                    <ButtonCenterText>Start New Month</ButtonCenterText>
                </AddTenantButton>


                <AddTenantButton
                    onPress={() => {
                        setDeleteTenantModal(true)
                    }}
                >
                    <ButtonCenterText>Delete a tenant</ButtonCenterText>
                </AddTenantButton>

                <AddTenantButton
                    onPress={() => {
                        setPastDataModal(true)
                        //console.log(monthlyData)
                    }}
                >
                    <ButtonCenterText>Show Past Data</ButtonCenterText>
                </AddTenantButton>

                {/* DEBUG BUTTON - DELETE ALL PAST DATA*/}
                {/* <AddTenantButton
                    onPress={() => {
                        deleteAllMonthly()
                    }}
                >
                    <ButtonCenterText>deleteAllMonthly</ButtonCenterText>
                </AddTenantButton> */}

            </InnerContainer>
        </StyledContainer>
    );
}




export const SettingWrapper = () => {

    return (
        <Provider store={Store} >
            <Setting />
        </Provider>
    );

}


export default SettingWrapper;