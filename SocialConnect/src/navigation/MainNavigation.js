import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { Component } from 'react';
import { auth } from '../firebase/config';


import Register from '../screens/Register';
import Login from '../screens/Login';
import TabNavigation from './TabNavigation';
import StackProfile from '../screens/StackProfile';
import Comentarios from '../screens/Comentarios';
import Cargando from '../screens/Cargando';


const Stack = createNativeStackNavigator();

export default class MainNavigation extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Cargando: true,
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    isLoading: false,
                });
            } 
        });
    }

    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator>
                {
                        this.state.isLoading ?
                            <Stack.Screen
                                name="Loading"
                                component={ Loading }
                                options={{ headerShown: false }}
                            /> :
                            null
                    }
                    <Stack.Screen
                        name='Register'
                        component={Register}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name='Login'
                        component={Login}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name='TabNavigation'
                        component={TabNavigation}
                        options={{
                            headerShown: false
                        }}
                    />
                     <Stack.Screen
                        name="StackProfile"
                        component={StackProfile}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name='Comentarios'
                        component={Comentarios}
                        options={{
                            headerShown: false
                        }}
                    />
                    
                </Stack.Navigator>
            </NavigationContainer>
        )

    }
   
}
