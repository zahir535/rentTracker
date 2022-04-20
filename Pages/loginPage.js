import React from "react";
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

//icon
import { AntDesign } from '@expo/vector-icons';

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
    GoogleIcon
} from './../UiComponents/uiComponents';

const Login = () => {
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <CenteredView>
                    <PageTitle>Login rentTracker</PageTitle>
                    <LoginButton>
                        <View>
                            <AntDesign name="google" size={24} color="black" />
                        </View>
                        <StrongText>   Sign In with Google</StrongText>
                    </LoginButton>
                </CenteredView>
            </InnerContainer>
        </StyledContainer>
    );
}


export default Login;