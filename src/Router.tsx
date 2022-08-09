import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from './Pages/Login Page';
import RegisterPage from './Pages/Register Page';
import HomePage from './Pages/Home Page';
import SearchWithoutLoginPage from './Pages/Search Without Login Page';
import FlashMessage from "react-native-flash-message";
import auth from '@react-native-firebase/auth';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Router=()=>{
    const [userSession,setUserSession]=useState<boolean>();
    useEffect(()=>{
        auth().onAuthStateChanged((user)=>{
            setUserSession(!!user);
        
        });
    },[]);
    const LoginRegisterStack=()=>{
        return(

            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Register" component={RegisterPage} />  
                <Stack.Screen name="SearchWithoutLogin" component={SearchWithoutLoginPage}></Stack.Screen>
            </Stack.Navigator>
        )
    }
    return(
        <NavigationContainer>
        {userSession?
        <Tab.Navigator screenOptions={{headerShown:false}}>
            <Tab.Screen name="Home" component={HomePage} />
        </Tab.Navigator>
        :
        <Stack.Navigator  screenOptions={{headerShown:false}}>
            <Stack.Screen name="LoginRegisterStack" component={LoginRegisterStack}></Stack.Screen>
        </Stack.Navigator>
        }
        <FlashMessage position="top" />
        </NavigationContainer>
    )
}
export default Router;