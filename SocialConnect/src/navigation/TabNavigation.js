import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Profile from '../screens/Profile'
import Posteo from '../screens/Posteo'
import Home from '../screens/Home'
import SearchResults from '../screens/SearchResults'

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen
                name='Posteo'
                component={Posteo}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen
                name='SearchResults'
                component={SearchResults}
                options={{
                    headerShown: false
                }}
            />

        </Tab.Navigator>
    )
}

