
import styled from 'styled-components';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    ScrollView,
} from 'react-native';

import { Constants } from 'expo-constants';


// -------------------------------- COLORS ---------------------------------
export const Colors = {
    primary: '#ffffff',
    secondary: '#EDE6DB',
    tertiary: '#417D7A',
    dark: '#1A3C40',
}
//destructure colors
const { primary, secondary, tertiary, dark } = Colors;

export const GoogleColors = {
    googlePrimary: '#EA4335',
    googleSecondary: '#4258F4',
    googleTertiary: '#FBBC05',
}

//destructure colors
const { googlePrimary, googleSecondary, googleTertiary } = GoogleColors;

// -------------------------------- BOX ---------------------------------

export const StyledContainer = styled(View)`
    flex: 1;
    paddingHorizontal: 18px;
    paddingTop: ${20 + 10}px;
    background-color: ${primary};
`

export const OuterShadowBox = styled.View`
    marginTop: 22px;
`;

export const InnerContainer = styled(View)`
    flex: 1;
    width: 100%;
`;

export const InnerShadowBox = styled(View)`
    margin: 20px 10px 10px;
    backgroundColor: #ffffff;
    borderRadius: 12px;
    padding: 12px;
    shadowColor: #000;
    shadowOpacity: 0.25;
    shadowRadius: 4px;
    elevation: 5;
`;
export const CenteredView = styled(View)`
    flex: 1;
    alignItems: center;
    justifyContent: center;
    textAlignVertical: center;
`;

export const LeftView = styled(CenteredView)`
    flex: 1;
    width: 100%;
    justifyContent: flex-start;
`;

export const SpaceBreak = styled(View)`
    height: 30px;
    width: 100%;
`;

export const SmallSpaceBreak = styled(View)`
    height: 12px;
    width: 100%;
`;

export const HorizontalView = styled(View)`
    flexDirection: row;
    justifyContent: space-between;
`;

export const HorizontalViewTop = styled(HorizontalView)`
    alignItems: center;
`;

export const HorizontalViewEnd = styled(HorizontalView)`
    justifyContent: flex-start;
`;

export const ModalView = styled(View)`
    flex: 1;
    margin: 20px;
    backgroundColor: ${primary};
    borderRadius: 20px;
    padding: 35px;
    alignItems: center;
    shadowColor: #000;
    shadowOpacity: 0.25;
    shadowRadius: 4px;
    elevation: 5;
`;

// -------------------------------- TEXT ---------------------------------

export const PageTitle = styled(Text)`
    color: ${dark};
    fontSize: 32px;
    fontWeight: bold;
`;

export const StrongText = styled(Text)`
    color: ${dark};
    fontSize: 18px;
    fontWeight: bold;
`;

export const NormalText = styled(Text)`
    color: ${dark};
    fontSize: 18px;
`;

export const HalfNormalText = styled(NormalText)`
    opacity: 0.7;
`;

export const LineNormalText = styled(NormalText)`
    opacity: 0.2;
`;

// -------------------------------- SCROLLVIEW ---------------------------------

export const ScrollList = styled(ScrollView)`
    flex: 1;
    width: 100%;
`;


// -------------------------------- BUTTON ---------------------------------

export const LoginButton = styled(TouchableOpacity)`
    padding: 20px;
    marginHorizontal: 36px;
    marginTop: 20px;
    borderWidth: 1px;
    borderRadius: 36px;
    flexDirection: row;
`;

export const AddTenantButton = styled(TouchableOpacity)`
    padding: 12px;
    width: 100%;
    marginTop: 20px;
    borderWidth: 1px;
    borderRadius: 36px;
    flexDirection: row;
    justifyContent: center;
`;

export const ModalButton = styled(TouchableOpacity)`
    padding: 12px;
    marginHorizontal: 2px;
`;

export const SquareButton = styled(TouchableOpacity)`
    padding: 12px;
    borderWidth: 1px;
    marginBottom: 24px;
    marginTop:12px;
`;

// -------------------------------- IMG/ICON ---------------------------------

export const GoogleIcon = styled(Image)`
    width: 30px;
    height: 30px;
`;


// -------------------------------- TEXTINPUTS ---------------------------------

export const InputField = styled(TextInput)`
    padding: 12px;
    width: 100%;
    marginBottom: 24px;
    marginTop:12px;
    borderWidth: 1px;
`;

export const InputFieldArray = styled(TextInput)`
    padding: 12px;
    width: 80%;
    marginBottom: 24px;
    marginTop:12px;
    borderWidth: 1px;
`;