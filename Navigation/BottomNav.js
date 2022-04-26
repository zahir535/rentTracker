import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';

//pages
import DashboardWrapper from '../Pages/dashboardPage';
import SettingWrapper from '../Pages/settingPage';

//icon
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Dashboard = () => {
    return (
        <DashboardWrapper />
    );
}

const Setting = () => {
    return (
        <SettingWrapper />
    );
}

function MyTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Dashboard"
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#fff',
                    tabBarActiveBackgroundColor: '#e91e63'
                }}
            >
                <Tab.Screen
                    name="Setting"
                    component={Setting}
                    options={{
                        tabBarLabel: 'Setting',
                        tabBarIcon: ({ color, size, focused }) => (
                            focused ?
                                <Ionicons name="settings" size={24} color="white" />
                                : <Ionicons name="settings" size={24} color="black" />

                        ),
                        //tabBarBadge: 555,
                    }}
                />

                <Tab.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{
                        tabBarLabel: 'Dashboard',
                        tabBarIcon: ({ color, size, focused }) => (
                            focused ?
                                <MaterialIcons name="dashboard" size={24} color="white" />
                                : <MaterialIcons name="dashboard" size={24} color="black" />
                        ),
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>

    );
}

export default MyTabs;