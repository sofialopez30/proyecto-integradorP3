import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Profile from '../screens/Profile'
import Posteo from '../screens/Posteo'
import Home from '../screens/Home'
import SearchResults from '../screens/SearchResults'
import { FontAwesome5 } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator style= {styles.container} >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ()=> <FontAwesome5 name='home' size={24} color='#61dafb' />
                    
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon:() => <FontAwesome5 name='user' size={24} color='#61dafb'  />

                }}
            />
            <Tab.Screen
                name='Posteo'
                component={Posteo}
                options={{
                    headerShown: false,
                    tabBarIcon:() => <FontAwesome5 name='camera' size={24} color='#61dafb'  />
                }}
            />
            <Tab.Screen 
                name='SearchResults'
                component={SearchResults}
                options={{
                    headerShown: false,
                    tabBarIcon:() => <FontAwesome5 name='search' size={24} color='#61dafb'  />
                }}
            />

        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
  });

