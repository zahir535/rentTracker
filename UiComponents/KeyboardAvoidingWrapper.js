import React from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

import {
    ScrollList,
    AvoidKeyboard,
    DissmissKeyboard,
} from './uiComponents';

const KeyboardAvoidingWrapper = ({ children }) => {
    return (
        <AvoidKeyboard>
            <ScrollList>
                <DissmissKeyboard onPress={Keyboard.dismiss}>
                    {children}
                </DissmissKeyboard>
            </ScrollList>
        </AvoidKeyboard>
    );
}

export default KeyboardAvoidingWrapper;

